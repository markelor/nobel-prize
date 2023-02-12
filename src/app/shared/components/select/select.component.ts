import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  form: FormGroup;
  //Inicializamos como vacio si no viene ningun nombre
  @Input() name: string = '';
  //Inicializamos como vacio si no viene ningun label
  @Input() label: string = '';
  /*Inicializamos como vacio si no viene ningun array, para que sea generico tiene que ser de tipo any, es decir,
  puede recibir datos de cualquier tipo, ene ste caso serán categorias*/
  @Input() items: any[] = [];
  /*Evento preparado para que emita hacia el padre el item selecionado, es de tipo any porque es generico,
   en nuestro caso sera la categoria seleccionada */
  @Output() itemSelected = new EventEmitter<any>();
  //Referencia al control
  private control: AbstractControl;

  constructor(public fg: ControlContainer) {}

  /**
   * Funcion a la que accedemos al iniciar el componente
   */
  ngOnInit() {
    //Se obtiene el form
    this.form = this.getForm();
    //Se obtiene el control del campo rquerido con el nombre indicado en el input
    this.control = this.form.get(this.name) as AbstractControl;
  }
  /**
   * Funcion para emitir el item seleccionado hacia el comonente padre
   * @param event
   */
  emitItemSelected(event: any) {
    //Guardamos el valor en el control y emitimos hacia el componente padre
    this.control.setValue(event);
    //this.yearSelected.emit(event.year())
  }
  /**
   * Función que obtiene el form declarado en el padre, si no existe lo creamos
   * @returns
   */
  private getForm(): FormGroup {
    return this.fg.formDirective
      ? (this.fg.formDirective as FormGroupDirective).form
      : new FormGroup({});
  }
}
