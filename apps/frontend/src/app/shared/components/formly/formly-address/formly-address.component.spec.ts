import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyAddressComponent } from './formly-address.component';

describe('FormlyAddressComponent', () => {
  let component: FormlyAddressComponent;
  let fixture: ComponentFixture<FormlyAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormlyAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormlyAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
