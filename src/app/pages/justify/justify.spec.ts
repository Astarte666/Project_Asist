import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Justify } from './justify';

describe('Justify', () => {
  let component: Justify;
  let fixture: ComponentFixture<Justify>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Justify]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Justify);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
