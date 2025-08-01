import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStudent } from './modal-student';

describe('ModalStudent', () => {
  let component: ModalStudent;
  let fixture: ComponentFixture<ModalStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
