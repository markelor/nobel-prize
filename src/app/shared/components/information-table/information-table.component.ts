import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-information-table',
  templateUrl: './information-table.component.html',
  styleUrls: ['./information-table.component.css'],
})
export class InformationTableComponent {
  /*Inicializamos como vacio si no viene ningun array, para que sea generico tiene que ser de tipo any, es decir,
  puede recibir datos de cualquier tipo, ene ste caso serán premios nobels*/
  @Input() items: any[] = [];
  //Nombres de la columna
  @Input() columnNames: string[] = [];
  //Columnas desplegadas
  @Input() displayedColumns: string[] = [];
  //Titulos de la columna
  @Input() columnTitles: string[] = [];
  //Se utiliza para los casos donde el elemento de la tabla a pintar es un array y queramos iterar una propiedad
  @Input() property: string = '';
  //Para la columa adicional con un icono
  @Input() iconColumn: string = '';
  //Para el ditulo de la columa adicional con un icono
  @Input() iconColumnTitle: string = '';
  //Para ancho de cada columna
  @Input() columnSize: string[] = [];
  /*Evento preparado para que emita hacia el padre con la accion seleccionada */
  @Output() rowSelected = new EventEmitter<any>();
  /**
   * Funcion a la que accedemos al iniciar el componente
   */
  ngOnInit() {}
  /**
   * Funcion para emitir el eventohacia el comonente padre como es generico, será de tipo any
   * @param event
   */
  emitRowSelected(event: any) {
    this.rowSelected.emit(event);
  }
}
