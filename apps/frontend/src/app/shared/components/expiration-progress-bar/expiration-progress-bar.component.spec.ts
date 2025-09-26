import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpirationProgressBarComponent } from './expiration-progress-bar.component';

describe('ExpirationProgressBarComponent', () => {
  let component: ExpirationProgressBarComponent;
  let fixture: ComponentFixture<ExpirationProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpirationProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpirationProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
