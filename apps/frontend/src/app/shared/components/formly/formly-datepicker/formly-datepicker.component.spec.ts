import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyDatepickerComponent } from './formly-datepicker.component';

describe('FormlyDatepickerComponent', () => {
  let component: FormlyDatepickerComponent;
  let fixture: ComponentFixture<FormlyDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
