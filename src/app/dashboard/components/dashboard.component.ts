import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin, map } from 'rxjs';
import { CustomValidators } from 'src/app/utils/validators';
import { Category } from '../models/internals/category';
import { NobelPrize } from '../models/internals/nobel-prize';
import { NobelPrizeService } from '../services/nobel-prize.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'dashboard-root',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

/**
 * Componente principal del app donde se va a incrustar el buscador, y se podrían añadir más cosas
 */
export class DashboardComponent {
  //Refencia al formulario creado
  searchForm: FormGroup;
  //referencia a las categorías de premio nobel
  categories: Category[];
  //Definimos las columnas de la tabla
  columnNames = ['awardYear', 'laureates'];
  columnTitles = ['Año', 'Galardonado/s'];
  displayedColumns = ['awardYear', 'laureates', 'action'];
  columnSize = ['samall-column', 'big-collum', 'small-column'];
  //referencia a los premios novel
  nobelPrizes: NobelPrize[];
  yearDiff = 15;
  moment = moment;
  public isSearching = false;

  constructor(
    private formBuilder: FormBuilder,
    private nobelPrizeService: NobelPrizeService,
    private router: Router
  ) {
    /**
     * cremos los campos del formulario necesarios para la búsqueda
     */
    this.searchForm = this.formBuilder.group(
      {
        category: new FormControl('', Validators.required),
        fromYear: new FormControl('', Validators.required),
        toYear: new FormControl('', Validators.required),
      },
      {
        validator: [
          CustomValidators.yearDiff(this.yearDiff, 'fromYear', 'toYear'),
          CustomValidators.fromYearLessThanToYear('fromYear', 'toYear'),
        ],
      }
    );
  }
  ngOnInit() {
    /*Obtenemos las categorias que hemos guardado en el json,
    NOTA: No he encontrada ninguna llamada para obtener las categorias en el swagger,
    si no lo suyo sería obtenerlos de forma dinámica
    */
    this.nobelPrizeService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  search() {

    if (this.searchForm.valid) {
      this.isSearching = true;
      // Realizar acciones si el formulario es válido
      const fromYear = this.searchForm.value.fromYear.year();
      const toYear = this.searchForm.value.toYear.year();
      const category = this.searchForm.value.category.key;
      const yearArray = [];
      for (let year = fromYear; year <= toYear; year++) {
        yearArray.push(year);
      }

      /*Para evitar la creación de múltiples suscripciones, se utiliza el operador forkJoin para
       combinar varias solicitudes HTTP en una sola. De esta manera, se suscribe solo una vez y
       se evitan posibles fugas de memoria debido a las suscripciones no desuscribidas.*/
      forkJoin(
        yearArray.map((year) =>
          this.nobelPrizeService.getNobelPrize(category, year)
        )
      )
        .pipe(
          map((responses: NobelPrize[]) => {
            this.isSearching = false;
            //Responses es un array que contiene las respuestas de todas las solicitudes.
            // Cada elemento del array es un array de premios nobel correspondiente a una respuesta.
            return responses.flat(); // Aplanamos las respuestas en un solo array
          })
        )
        .subscribe((nobelPrizes: NobelPrize[]) => {
          this.nobelPrizes = nobelPrizes;
        });
    }
  }

  nobelPriceSelected(nobelPrize: NobelPrize) {
    /*Ya tenemos nobelPrize con los datos exactos para pinatar el detalle,
    sólo se llamará de nuevo si se refresca la pagina y se pierde la información,
     también se podría guardar en el local storage y no haría falta hacer la llamda nunca más*/
    this.nobelPrizeService.currentNobelPrize = nobelPrize;
    this.router.navigate([
      'dashboard/premios-nobel',
      this.searchForm.controls['category'].value.key,
      nobelPrize.awardYear.toString(),

    ]);
  }
}
