import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosFormsComponent } from './vehiculos-forms.component';

describe('VehiculosFormsComponent', () => {
  let component: VehiculosFormsComponent;
  let fixture: ComponentFixture<VehiculosFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculosFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
