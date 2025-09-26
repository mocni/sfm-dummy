import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyDropdownComponent } from './formly-dropdown.component';

describe('FormlyDropdownComponent', () => {
  let component: FormlyDropdownComponent;
  let fixture: ComponentFixture<FormlyDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
