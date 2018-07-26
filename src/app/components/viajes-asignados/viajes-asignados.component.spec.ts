import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesAsignadosComponent } from './viajes-asignados.component';

describe('ViajesAsignadosComponent', () => {
  let component: ViajesAsignadosComponent;
  let fixture: ComponentFixture<ViajesAsignadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesAsignadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
