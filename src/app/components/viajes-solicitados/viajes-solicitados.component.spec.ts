import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesSolicitadosComponent } from './viajes-solicitados.component';

describe('ViajesSolicitadosComponent', () => {
  let component: ViajesSolicitadosComponent;
  let fixture: ComponentFixture<ViajesSolicitadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesSolicitadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesSolicitadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
