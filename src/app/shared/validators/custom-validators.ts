import { AbstractControl, ValidationErrors } from '@angular/forms'

function passwordMatchValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const password = control.parent?.get('password')?.value
  const confirmPassword = control.value

  if (password !== confirmPassword) {
    return { mismatch: true }
  }
  return null
}

function noSpacesValidator(control: AbstractControl): ValidationErrors | null {
  return control.value?.includes(' ') ? { spacesNotAllowed: true } : null
}

export const CustomValidators = {
  PasswordMatch: passwordMatchValidator,
  NoSpaces: noSpacesValidator,
}
