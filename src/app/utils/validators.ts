import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static yearDiff(maxDiff: number, fromYearField: string, toYearField: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fromYear = control.get(fromYearField)?.value;
      const toYear = control.get(toYearField)?.value;

      if (fromYear && toYear && (toYear.year() - fromYear.year()) > maxDiff) {
        return { yearDiff: true };
      }
      return null;
    };
  }

  static fromYearLessThanToYear(fromYearField: string, toYearField: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fromYear = control.get(fromYearField)?.value;
      const toYear = control.get(toYearField)?.value;

      if (fromYear && toYear && fromYear.year() > toYear.year()) {
        return { fromYearLessThanToYear: true };
      }
      return null;
    };
  }
}
