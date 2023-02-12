import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearPickerComponent } from './components/year-picker/year-picker.component';
import { DateAdapter,  MAT_DATE_FORMATS,  MAT_DATE_LOCALE,  NativeDateAdapter } from '@angular/material/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './external-modules/marerial.module';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { SelectComponent } from './components/select/select.component';
import { InformationTableComponent } from './components/information-table/information-table.component';
/**
 * Para que el calendario pinte en formato 'YYYY'
 */
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [ YearPickerComponent,SelectComponent,InformationTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule

  ],
  exports:[
    SelectComponent,
    YearPickerComponent,
    InformationTableComponent,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
     provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
   ]
})
export class SharedModule { }
