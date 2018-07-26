import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoViajeFormComponent } from './nuevo-viaje-form.component';

describe('NuevoViajeFormComponent', () => {
  let component: NuevoViajeFormComponent;
  let fixture: ComponentFixture<NuevoViajeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoViajeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoViajeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
