import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomSnackbarComponent } from "../components/snackbar/snackbar";
import { environment } from "environments/environment.dev";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  public showToastMessage(displayString: string) {
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      data: displayString,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: environment.snackbarDuration,
      panelClass: "error-snackbar", // This applies the error style
    });
  }
}
