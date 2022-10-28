import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ValidateExists(list: any[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    return list.includes(control.value.toLowerCase()) ? { exists: { value: control.value } } : null;
  }
}
