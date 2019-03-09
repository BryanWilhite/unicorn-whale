import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

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

  get email() {
    return this.myForm.get('email');
  }

  get phoneForms() {
    return this.myForm.get('phones') as FormArray;
  }

  get password() {
    return this.myForm.get('password');
  }

  get age() {
    return this.myForm.get('age');
  }

  addPhone() {
    const phone: FormGroup = this.fb.group({
      area: [],
      prefix: [],
      line: []
    });

    this.phoneForms.push(phone);
  }

  deletePhone(i: number) {
    this.phoneForms.removeAt(i);
  }

  submitHandler() {
    this.success = true;
  }
}
