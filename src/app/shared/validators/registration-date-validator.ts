import {AbstractControl, ValidatorFn} from "@angular/forms";

export function registrationDateValidator(): ValidatorFn | null {
    return (control: AbstractControl) => {
        if(control.value && (new Date().getDate() + 3 > new Date(control.value).getDate())){
            return {
                invalidDate: true
            }
        }
        return null
    }
}
