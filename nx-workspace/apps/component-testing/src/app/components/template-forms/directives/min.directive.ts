import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Validator, ValidatorFn, AbstractControl, ValidationErrors, Validators, NG_VALIDATORS } from '@angular/forms';

const selector = 'min';

@Directive({
    selector: `[${selector}]`,
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: MinValidator,
        multi: true
    }]
})
export class MinValidator implements Validator, OnChanges {

    // TODO: without an @Input binding property name the directive will not be found.
    // Is this because the selector matches an existing HTML property?
    @Input(selector) min !: string;

    private _validator !: ValidatorFn;
    private _onChange !: () => void;

    ngOnChanges(changes: SimpleChanges): void {
        if (selector in changes) {
            this._createValidator();
            if (this._onChange) { this._onChange(); }
        }
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.min == null ? null : this._validator(control);
    }

    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

    private _createValidator(): void {
        this._validator = Validators.min(parseInt(this.min, 10));
    }
}