import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarFormComponent } from './finalizar-form.component';

describe('FinalizarFormComponent', () => {
  let component: FinalizarFormComponent;
  let fixture: ComponentFixture<FinalizarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
