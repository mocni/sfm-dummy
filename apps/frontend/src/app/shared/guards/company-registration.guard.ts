import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { ROUTES } from "../enums/routes.enum";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class CompanyRegistrationGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // If isCompanyRegister is false or not set, redirect to company settings
    if (!this.authService.isCompanyRegistered()) {
      this.router.navigate([ROUTES.COMPANY_SETTINGS]);
      return false;
    }

    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  canDeactivate(): boolean {
    // Prevent navigation away if company is not registered
    if (!this.authService.isCompanyRegistered()) {
      return false;
    }

    return true;
  }
}
