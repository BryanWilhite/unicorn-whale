import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormsComponent } from './reactive-forms.component';
import { By } from '@angular/platform-browser';

describe(ReactiveFormsComponent.name, () => {
  let component: ReactiveFormsComponent;
  let fixture: ComponentFixture<ReactiveFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ReactiveFormsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should not be valid by default', () => {
      expect(component.myForm.valid).toEqual(false);
    });

    it('should be valid with specified data and successfully submit', () => {
      component.email.setValue('bill.gates@microsoft.com');
      expect(component.email.valid).toBe(
        true,
        'The entered form data [email] is not valid.'
      );

      component.addPhone();
      expect(component.phoneForms.length).toEqual(1);
      const phoneArea = component.getPhone(0, 'area');
      phoneArea.setValue('213');
      const phonePrefix = component.getPhone(0, 'prefix');
      phonePrefix.setValue('555');
      const phoneLine = component.getPhone(0, 'line');
      phoneLine.setValue('1234');

      component.password.setValue('QWqJitwyY7dtJqLBF7Bh');
      expect(component.password.valid).toBe(
        true,
        'The entered form data [password] is not valid.'
      );

      component.age.setValue(39);
      expect(component.age.valid).toBe(
        true,
        'The entered form data [age] is not valid.'
      );

      expect(component.myForm.valid).toBe(true, 'The form is not valid');

      fixture.detectChanges();

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

      expect(component.success).toBe(true, 'The expected form submission success is not here.');
    });
  });
});
