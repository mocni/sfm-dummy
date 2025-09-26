import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySelectComponent } from './formly-select.component';

describe('FormlySelectComponent', () => {
  let component: FormlySelectComponent;
  let fixture: ComponentFixture<FormlySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlySelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
