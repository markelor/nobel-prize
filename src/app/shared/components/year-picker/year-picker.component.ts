import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ControlContainer,
  AbstractControl,
} from '@angular/forms';
import {
  MatDatepicker,
} from '@angular/material/datepicker';

import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.css'],
})
export class YearPickerComponent {
  // declarar la variable form
  form: FormGroup;

  @ViewChild('picker', { static: false })
  private picker!: MatDatepicker<Date>;
  public startAtToYear = moment(new Date(1990));
  //Inicializamos como vacio si no viene ningun nombre
  @Input() name: string = '';
  //Inicializamos como vacio si no viene ningun label
  @Input() label: string = '';
  /*Evento preparado para que emita hacia el padre la fecha seleccionada*/
  @Output() yearSelected = new EventEmitter<number>();
  //Referencia al control
  private control: AbstractControl;

  constructor(public fg: ControlContainer) {}
/**
 * Funcion a la que accedemos aliniciar el componente
 */
  ngOnInit() {
    //Se obtiene el form
    this.form = this.getForm();
    //Se obtiene el control del campo rquerido con el nombre indicado en el input
    this.control = this.form.get(this.name) as AbstractControl;
  }
  /**
   *Funcion para emitir la fecha seleccionada hacia el comonente padre
   * @param event de tipo moment
   */
  emitYearSelected(event: Moment) {
    //Se cierra el calendario
    this.picker.close();
    //Se guarda el valor en el control
    this.control.setValue(event);
    //Se emite el año  hacia el componente padre
    this.yearSelected.emit(event.year());
  }
  /**
   *Función que obtiene el form declarado en el padre, si no existe lo creamos
   * @returns
   */
  private getForm(): FormGroup {
    return this.fg.formDirective
      ? (this.fg.formDirective as FormGroupDirective).form
      : new FormGroup({});
  }
}
