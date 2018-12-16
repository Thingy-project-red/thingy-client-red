import { Directive} from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[chatId][formControlName],[chatId][formControl],[chatId][ngModel]',
    providers: [{ provide: NG_VALIDATORS, useExisting: chatIdDirective, multi: true }]
})
export class chatIdDirective implements Validator {
    validate(control: FormControl): { [key: string]: any } {
        // Set invalid if chatId is not number or smaller than 0
        if (typeof control.value !== 'number' || control.value < 0) {
            return { "chatId": true };
        }
        return null;
    }
}
