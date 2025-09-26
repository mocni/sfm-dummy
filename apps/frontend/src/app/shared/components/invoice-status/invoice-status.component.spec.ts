import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { InvoiceStatusComponent } from "./invoice-status.component";
import { InvoiceStatus } from "@smart-fleet-management/common";

describe("InvoiceStatusComponent", () => {
  let component: InvoiceStatusComponent;
  let fixture: ComponentFixture<InvoiceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceStatusComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceStatusComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display PAID status with success background", () => {
    component.status = InvoiceStatus.PAID;
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector(".invoice-status-chip");
    expect(chip.style.backgroundColor).toBe("rgb(54, 199, 108)"); // #36c76c
    expect(chip.textContent.trim()).toBe("PAID");
  });

  it("should display PENDING status with warning background", () => {
    component.status = InvoiceStatus.PENDING;
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector(".invoice-status-chip");
    expect(chip.style.backgroundColor).toBe("rgb(248, 194, 10)"); // #f8c20a
    expect(chip.textContent.trim()).toBe("PENDING");
  });

  it("should display UNPAID status with error background", () => {
    component.status = InvoiceStatus.UNPAID;
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector(".invoice-status-chip");
    expect(chip.style.backgroundColor).toBe("rgb(255, 102, 146)"); // #ff6692
    expect(chip.textContent.trim()).toBe("UNPAID");
  });

  it("should show icon when showIcon is true", () => {
    component.status = InvoiceStatus.PAID;
    component.showIcon = true;
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector("mat-icon");
    expect(icon).toBeTruthy();
    expect(icon.textContent.trim()).toBe("check_circle");
  });

  it("should not show icon when showIcon is false", () => {
    component.status = InvoiceStatus.PAID;
    component.showIcon = false;
    fixture.detectChanges();

    const icon = fixture.nativeElement.querySelector("mat-icon");
    expect(icon).toBeFalsy();
  });

  it("should apply correct size class", () => {
    component.status = InvoiceStatus.PAID;
    component.size = "large";
    fixture.detectChanges();

    const chip = fixture.nativeElement.querySelector(".invoice-status-chip");
    expect(chip.classList.contains("invoice-status-chip--large")).toBe(true);
  });
});
