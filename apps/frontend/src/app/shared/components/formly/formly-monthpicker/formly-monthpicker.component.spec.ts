import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyMonthpickerComponent } from './formly-monthpicker.component';

describe('FormlyMonthpickerComponent', () => {
  let component: FormlyMonthpickerComponent;
  let fixture: ComponentFixture<FormlyMonthpickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyMonthpickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyMonthpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
