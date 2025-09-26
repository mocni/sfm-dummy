import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyCheckboxComponent } from './formly-checkbox.component';

describe('FormlyCheckboxComponent', () => {
  let component: FormlyCheckboxComponent;
  let fixture: ComponentFixture<FormlyCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
