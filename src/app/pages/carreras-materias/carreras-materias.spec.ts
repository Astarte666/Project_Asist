import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasMaterias } from './carreras-materias';

describe('CarrerasMaterias', () => {
  let component: CarrerasMaterias;
  let fixture: ComponentFixture<CarrerasMaterias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerasMaterias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrerasMaterias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
