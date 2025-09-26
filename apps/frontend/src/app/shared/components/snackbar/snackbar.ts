import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { TranslateModule } from "@ngx-translate/core";
import { TablerIconsModule } from "angular-tabler-icons";

@Component({
  selector: "app-custom-snackbar",
  standalone: true,
  imports: [CommonModule, TablerIconsModule, MatIconButton, TranslateModule],
  template: `
    <div class="snackbar-content">
      <span>{{ data | translate }}</span>
      <button
        mat-icon-button
        class="d-flex"
        (click)="closeSnackbar()"
      >
        <i-tabler
          name="x"
          class="icon-20"
        ></i-tabler>
      </button>
    </div>
  `,
  styles: [
    `
      .snackbar-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px;
      }

      .error-snackbar {
        background-color: #ff6692;
      }
    `,
  ],
})
export class CustomSnackbarComponent {
  // Assume that the data will have information on whether it's an error or not
  isError: boolean = false;

  constructor(
    public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
  ) {}

  closeSnackbar() {
    this.snackBarRef.dismiss();
  }
}
