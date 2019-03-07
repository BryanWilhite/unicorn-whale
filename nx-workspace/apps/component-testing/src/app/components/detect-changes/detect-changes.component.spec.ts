import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectChangesComponent } from './detect-changes.component';

describe(DetectChangesComponent.name, () => {
  let component: DetectChangesComponent;
  let fixture: ComponentFixture<DetectChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectChangesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    fixture.detectChanges();
    expect(component.myValue).toEqual(100);
  });

  it('should not call ngOnInit', () => {
    expect(component.myValue).toEqual(-1);
  });
});
