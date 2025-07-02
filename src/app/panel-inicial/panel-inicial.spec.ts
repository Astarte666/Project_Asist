import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelInicial } from './panel-inicial';

describe('PanelInicial', () => {
  let component: PanelInicial;
  let fixture: ComponentFixture<PanelInicial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelInicial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelInicial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
