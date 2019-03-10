import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-workspace-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.scss']
})
export class TemplateFormsComponent implements OnInit {

  myFormData: MyFormData;

  constructor() {
    this.myFormData = {
      success: false,
      email: null,
      phones: [],
      password: null,
      age: null
    }
  }

  ngOnInit() {
  }

  addPhone(): void {
    const phone: Phone = {
      area: null,
      prefix: null,
      line: null
    };

    this.myFormData.phones.push(phone);
  }

  deletePhone(i: number): void {
    if (!this.myFormData.phones) { return; }
    if (!this.myFormData.phones.length) { return; }
    this.myFormData.phones.splice(i, 1);
  }

  submitHandler(): void {
    this.myFormData.success = true;
  }

}

export class Phone {
  area: string;
  prefix: string;
  line: string;
}

export class MyFormData {
  success: boolean;
  email: string;
  phones: Phone[];
  password: string;
  age: number;
}
