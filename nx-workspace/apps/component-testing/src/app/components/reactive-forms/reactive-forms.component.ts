import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'nx-workspace-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {
  myForm: FormGroup;
  success = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phones: this.fb.array([]),
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]
      ],
      age: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.min(18),
          Validators.max(65)
        ]
      ]
    });
  }

  get email(): AbstractControl {
    return this.myForm.get('email');
  }

  get phoneForms(): FormArray {
    return this.myForm.get('phones') as FormArray;
  }

  get password(): AbstractControl {
    return this.myForm.get('password');
  }

  get age(): AbstractControl {
    return this.myForm.get('age');
  }

  addPhone(): void {
    const phone: FormGroup = this.fb.group({
      area: [],
      prefix: [],
      line: []
    });

    this.phoneForms.push(phone);
  }

  getPhone(
    i: number,
    propertyName: 'area' | 'prefix' | 'line'
  ): AbstractControl | null {
    if (!this.phoneForms || !this.phoneForms.length) {
      return null;
    }
    if (this.phoneForms.length < i - 1) {
      return null;
    }
    const group = this.phoneForms.at(i) as FormGroup;
    return group.get(propertyName);
  }

  deletePhone(i: number) {
    this.phoneForms.removeAt(i);
  }

  submitHandler() {
    this.success = true;
  }
}
