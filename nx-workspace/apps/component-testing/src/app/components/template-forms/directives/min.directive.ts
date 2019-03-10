import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Validator, ValidatorFn, AbstractControl, ValidationErrors, Validators, NG_VALIDATORS } from '@angular/forms';

@Directive({
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: MinValidator,
        multi: true
    }],
    selector: '[nx-workspace-min][formControlName],[nx-workspace-min][formControl],[nx-workspace-min][ngModel]',
})
export class MinValidator implements Validator, OnChanges {

    @Input() min !: string;

    private _validator !: ValidatorFn;
    private _onChange !: () => void;

    ngOnChanges(changes: SimpleChanges): void {
        if ('min' in changes) {
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