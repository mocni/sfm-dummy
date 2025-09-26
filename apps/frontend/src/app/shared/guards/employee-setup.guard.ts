import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ROUTES } from "../enums/routes.enum";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class EmployeeSetupGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(): boolean {
    // If isEmployeeSetup is false or not set, redirect to user settings
    if (!this.authService.isEmployeeSetup()) {
      this.router.navigate([ROUTES.USER_SETTINGS]);
      return false;
    }

    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

  canDeactivate(): boolean {
    // Prevent navigation away if employee is not setup
    if (!this.authService.isEmployeeSetup()) {
      return false;
    }

    return true;
  }
}
