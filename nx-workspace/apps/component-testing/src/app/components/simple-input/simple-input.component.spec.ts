import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SimpleInputComponent } from './simple-input.component';

describe(SimpleInputComponent.name, () => {
  let component: SimpleInputComponent;
  let fixture: ComponentFixture<SimpleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SimpleInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checkbox is checked if value is true', async(() => {
    component.value = true;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const inEl = fixture.debugElement.query(By.css('#simpleInput'));
      expect(inEl.nativeElement.checked).toBe(true);
    });
  }));
});
