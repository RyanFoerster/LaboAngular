import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function strongPassword(): ValidatorFn | null {

    return (control: AbstractControl): ValidationErrors | null => {
        const value: string = control.value;

        if (!value) {
            return null; // Si le champ est vide, la validation est ignorée
        }

        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasDigit = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/.test(value);

        const isValid =
            hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && value.length >= 8;

        return isValid ? null : { strongPassword: true };
    };

}
