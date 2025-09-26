import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MaterialModule } from "material.module";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "app/shared/services/auth.service";
import { CoreService } from "app/shared/services/core.service";
import { ROUTES } from "app/shared/enums/routes.enum";
import { AuthenticationService } from "@api/authentication.service";
import { LoginUserDto } from "@models/loginUserDto";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, MatButtonModule, TranslateModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  options = this.settings.getOptions();

  constructor(
    private settings: CoreService,
    private router: Router,
    private _authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private _authService: AuthService,
  ) {}

  form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  public submit(): void {
    if (this.form.valid) {
      this._authenticationService.authControllerSignIn(this.form.value as LoginUserDto).subscribe(
        (response) => {
          this._authService.login(response, response.access_token, response.refresh_token);
          this.router.navigate([ROUTES.HOMEPAGE]);
        },
        (error) => {
          this._snackBar.open(this.translate.instant("login.loginError"), "", {
            horizontalPosition: "center",
            verticalPosition: "bottom",
          });
        },
      );
    }
  }
}
