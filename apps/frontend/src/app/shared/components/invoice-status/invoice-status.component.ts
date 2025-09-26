import { Component, Input, OnInit, OnChanges, SimpleChanges, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { InvoiceStatus } from "@smart-fleet-management/common";
import { InvoiceService } from "@api/invoice.service";
import { UpdateInvoiceStatusResponseDto } from "@models/updateInvoiceStatusResponseDto";

@Component({
  selector: "app-invoice-status",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatIcon, MatMenuModule, MatButtonModule, TranslateModule],
  templateUrl: "./invoice-status.component.html",
  styleUrls: ["./invoice-status.component.scss"],
})
export class InvoiceStatusComponent implements OnInit, OnChanges {
  @Input() status!: InvoiceStatus;
  @Input() invoiceId!: string;
  @Input() showIcon: boolean = false;
  @Input() size: "small" | "medium" | "large" = "medium";
  @Input() clickable: boolean = false;
  @Input() noInvoice: boolean = false; // New input for when there's no invoice
  statusChanged = output<UpdateInvoiceStatusResponseDto>();

  availableStatuses: { value: InvoiceStatus; label: string; color: string; backgroundColor: string }[] = [];

  // Computed property to determine if status should be clickable
  get isStatusClickable(): boolean {
    return this.clickable && this.status !== InvoiceStatus.PAID && !this.noInvoice;
  }

  statusConfig: {
    color: string;
    backgroundColor: string;
    icon?: string;
    text: string;
  } = {
    color: "#ffffff",
    backgroundColor: "#526b7a",
    text: "UNKNOWN",
  };

  constructor(
    private invoiceService: InvoiceService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.setStatusConfig();
    this.setAvailableStatuses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["status"]) {
      this.setStatusConfig();
      this.setAvailableStatuses();
    }
  }

  private setStatusConfig(): void {
    // Handle case when there's no invoice
    if (this.noInvoice) {
      this.statusConfig = {
        color: "#ffffff",
        backgroundColor: "#6c757d", // Gray color for no invoice
        text: "INVOICE_NOT_CREATED",
      };
      return;
    }

    switch (this.status) {
      case InvoiceStatus.CANCELED:
        this.statusConfig = {
          color: "#fff",
          backgroundColor: "#526b7a",
          text: "CANCELED",
        };
        break;
      case InvoiceStatus.DRAFT:
        this.statusConfig = {
          color: "#ffffff",
          backgroundColor: "#635bff",
          text: "DRAFT",
        };
        break;
      case InvoiceStatus.PAID:
        this.statusConfig = {
          color: "#ffffff",
          backgroundColor: "#36c76c",
          text: "PAID",
        };
        break;
      case InvoiceStatus.PENDING:
        this.statusConfig = {
          color: "#29343d",
          backgroundColor: "#f8c20a",
          text: "PENDING",
        };
        break;
      case InvoiceStatus.UNPAID:
        this.statusConfig = {
          color: "#ffffff",
          backgroundColor: "#e80b0b",
          text: "UNPAID",
        };
        break;
      default:
        this.statusConfig = {
          color: "#ffffff",
          backgroundColor: "#526b7a",
          text: this.status || "UNKNOWN",
        };
    }
  }

  getBadgeClass(): string {
    return `invoice-status-badge invoice-status-badge--${this.size}`;
  }

  private setAvailableStatuses(): void {
    const allStatuses = [
      { value: InvoiceStatus.CANCELED, label: "CANCELED", color: "#fff", backgroundColor: "#526b7a" },
      { value: InvoiceStatus.DRAFT, label: "DRAFT", color: "#ffffff", backgroundColor: "#635bff" },
      { value: InvoiceStatus.PAID, label: "PAID", color: "#ffffff", backgroundColor: "#36c76c" },
      { value: InvoiceStatus.PENDING, label: "PENDING", color: "#29343d", backgroundColor: "#f8c20a" },
      { value: InvoiceStatus.UNPAID, label: "UNPAID", color: "#ffffff", backgroundColor: "#e80b0b" },
    ];

    this.availableStatuses = allStatuses.filter((status) => status.value !== this.status);
  }

  onStatusSelect(newStatus: InvoiceStatus): void {
    if (!this.invoiceId) return;
    this.invoiceService.invoiceControllerUpdateInvoiceStatus(this.invoiceId, { status: newStatus as any }).subscribe({
      next: (updatedInvoice) => {
        // Update local status
        this.status = newStatus;
        this.setStatusConfig();
        this.setAvailableStatuses();

        // Emit the complete updated invoice object
        this.statusChanged.emit(updatedInvoice);

        // Show success toast message with translation
        this.snackBar.open(
          this.translateService.instant("invoice.status.updated"),
          this.translateService.instant("common.close"),
          { duration: 3000 },
        );
      },
      error: () => {
        // Show error toast message with translation
        this.snackBar.open(
          this.translateService.instant("invoice.status.updateError"),
          this.translateService.instant("common.close"),
          { duration: 3000 },
        );
      },
    });
  }
}
