import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Preceptor } from './preceptor';

describe('Preceptor', () => {
  let component: Preceptor;
  let fixture: ComponentFixture<Preceptor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Preceptor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Preceptor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
