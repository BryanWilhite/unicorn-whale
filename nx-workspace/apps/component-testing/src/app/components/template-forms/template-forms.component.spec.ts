import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TemplateFormsComponent } from './template-forms.component';

describe('TemplateFormsComponent', () => {
  let component: TemplateFormsComponent;
  let fixture: ComponentFixture<TemplateFormsComponent>;

  beforeEach(async () => {
    const meta = {
      imports: [FormsModule],
      declarations: [TemplateFormsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    };

    await TestBed.configureTestingModule(meta).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should not be valid by default', async () => {
      expect(component.myForm).toBeTruthy('The form is expected to be truthy.');

      await fixture.whenStable();

      expect(component.myForm.valid).toEqual(false);
    });

    it('should be valid with specified data and successfully submit', async () => {
      component.myFormData.email = 'bill.gates@microsoft.com';
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.myForm.controls.email).toBeTruthy(
        'The expected form control is not here.'
      );
      expect(component.myForm.controls.email.valid).toBe(
        true,
        'The entered form data [email] is not valid.'
      );

      component.addPhone();
      expect(component.myFormData.phones.length).toEqual(1);
      component.myFormData.phones[0].area = '213';
      component.myFormData.phones[0].prefix = '555';
      component.myFormData.phones[0].line = '1234';
      // TODO: verify that the UI displays on phone.

      component.myFormData.password = 'QWqJitwyY7dtJqLBF7Bh';
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.myForm.controls.password).toBeTruthy(
        'The expected form control is not here.'
      );
      expect(component.myForm.controls.password.valid).toBe(
        true,
        'The entered form data [password] is not valid.'
      );

      component.myFormData.age = 39;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.myForm.controls.age).toBeTruthy(
        'The expected form control is not here.'
      );
      expect(component.myForm.controls.age.valid).toBe(
        true,
        'The entered form data [age] is not valid.'
      );

      const button = fixture.debugElement.query(
        By.css("button[type='submit']")
      );
      expect(button).toBeTruthy('The expected form submit button is not here.');
      expect(button.nativeElement.disabled).toBe(
        false,
        'The button is expected to be enabled.'
      );

      spyOn(component, 'submitHandler').and.callThrough();
      button.nativeElement.click();

      expect(component.submitHandler).toHaveBeenCalledTimes(1);

      expect(component.myFormData.success).toBe(
        true,
        'The expected form submission success is not here.'
      );
    });
  });
});
