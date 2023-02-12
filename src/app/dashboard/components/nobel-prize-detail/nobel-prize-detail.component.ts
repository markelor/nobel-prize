import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { NobelPrize } from '../../models/internals/nobel-prize';
import { NobelPrizeService } from '../../services/nobel-prize.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-nobel-prize-detail',
  templateUrl: './nobel-prize-detail.component.html',
  styleUrls: ['./nobel-prize-detail.component.css'],
})
export class NobelPrizeDetailComponent {
  nobelPrize: NobelPrize;
  public isSearching = false;
  constructor(
    private router: ActivatedRoute,
    private nobelPrizeService: NobelPrizeService,
    public location: Location
  ) {}

  ngOnInit() {
    //Obtenemos los premio nobel por año del componente anterior para pintar
    this.nobelPrize = this.nobelPrizeService.currentNobelPrize;
    //El usuario ha refrescado la página y hay que hacer la llamada al servicio
    if (!this.nobelPrize) {
      this.isSearching=true;
      //utilizamos rxjs para obtener todo en un abservable y no tener subscripciones anidadas que nos den problemas
      this.router.params.pipe(
        tap((params) => {
          const category = params['category'];
          const year = Number(params['awardYear']);
        }),
        switchMap((params) => this.nobelPrizeService.getNobelPrize(params['category'], Number(params['awardYear'])))
      ).subscribe((nobelPrize: NobelPrize) => {
        this.nobelPrize = nobelPrize;
        this.isSearching=false;

      });
    }

  }
}

