import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appErrorFormGroup]',
})
export class ErrorFormGroupDirective implements OnChanges {
  @Input('appErrorFormGroup') form: FormGroup;
  errorMessages: { [key: string]: string } = {
    required: 'Este campo es requerido',
    email: 'Ingrese un correo electrónico válido',
    minlength: 'Debe ingresar al menos {{minlength.requiredLength}} caracteres',
    maxlength: 'Debe ingresar menos de {{maxlength.requiredLength}} caracteres',
    yearDiff: 'El rango de años debe ser de {{maxDiff}} o menos',
    // Agrega aquí los mensajes de error que necesites
  };
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const form = changes['form'].currentValue;
    if (form && form.errors) {
      const formErrors = form.errors;
      for (const field in formErrors) {
        if (formErrors.hasOwnProperty(field)) {
          const control = form.get(field);
          if (control) {
            const errorKey = Object.keys(formErrors[field])[0];
            const errorMessage = this.getErrorMessage(
              field,
              errorKey,
              control.errors[errorKey]
            );
            control.markAsTouched();
            control.setErrors({
              ...control.errors,
              [errorKey]: true,
              message: errorMessage,
            });

            // get the input element that corresponds to the control
            const controlElement = this.el.nativeElement.querySelector(
              `[formcontrolname="${field}"]`
            );
            if (controlElement) {
              // display the error message below the input
              const errorElement = document.createElement('div');
              errorElement.classList.add('error-message');
              errorElement.textContent = errorMessage;
              controlElement.insertAdjacentElement('afterend', errorElement);
            }
          }
        }
      }
    }
  }

  private getErrorMessage(field: string, errorKey: string, error: any): string {
    let errorMessage = '';
    if (this.errorMessages[errorKey]) {
      errorMessage = this.errorMessages[errorKey];
    } else {
      errorMessage = `El campo ${field} es inválido`;
    }
    if (error) {
      for (const key in error) {
        if (error.hasOwnProperty(key)) {
          errorMessage = errorMessage.replace(`{{${key}}}`, error[key]);
        }
      }
    }
    return errorMessage;
  }
}
