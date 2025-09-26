import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ROUTES } from "../enums/routes.enum";
import { AuthenticationService } from "@api/authentication.service";
import { SignInResponseDto } from "@models/signInResponseDto";
import { SignInResponseDtoUser } from "@models/signInResponseDtoUser";
import { CreateEmployeeResponseDto } from "@models/createEmployeeResponseDto";

@Injectable({
  providedIn: "root", // Ovim se osigurava da je servis dostupan svugdje
})
export class AuthService {
  getCompanyId(): string {
    if (this.isCompanyRegistered()) {
      return localStorage.getItem(this.COMPANY_ID_KEY) ?? "";
    }
    return "";
  }
  private readonly ACCESS_TOKEN_KEY = "access_token";
  private readonly REFRESH_TOKEN_KEY = "refresh_token";
  private readonly USERNAME_KEY = "user";
  readonly COMPANY_ID_KEY = "company_id";
  readonly EMPLOYEE_SETUP_KEY = "isEmployeeSetup";

  private userSubject = new BehaviorSubject<SignInResponseDtoUser | null>(null);

  constructor(
    private _router: Router,
    private _auth: AuthenticationService,
  ) {
    // Initialize user data from localStorage on service creation
    this.initializeUserFromStorage();
  }

  private initializeUserFromStorage(): void {
    const userData = localStorage.getItem(this.USERNAME_KEY);
    if (userData) {
      try {
        const response: SignInResponseDto = JSON.parse(userData);
        this.userSubject.next(response.user);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        this.userSubject.next(null);
      }
    }
  }

  public isCompanyRegistered(): boolean {
    return localStorage.getItem(this.COMPANY_ID_KEY) !== null;
  }

  public setCompanyRegistered(companyId: string): void {
    if (companyId) {
      localStorage.setItem(this.COMPANY_ID_KEY, companyId);
    }
  }

  public setEmployeeSetup(employee: CreateEmployeeResponseDto): void {
    localStorage.setItem(this.EMPLOYEE_SETUP_KEY, employee.id);
    const user = this.getUserData();
    user.user = {
      ...user.user,
      employee,
    };
    this.userSubject.next(user.user);
    localStorage.setItem(this.USERNAME_KEY, JSON.stringify(user));
  }

  public isEmployeeSetup(): boolean {
    const user = this.getUserData();
    return user.user.employee?.id !== null;
  }

  public login(response: SignInResponseDto, accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.USERNAME_KEY, JSON.stringify(response));
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);

    this.userSubject.next(response.user);
    if (response.user.company?.id) {
      localStorage.setItem(this.COMPANY_ID_KEY, response.user.company?.id.toString());
    }

    if (response.user.employee?.id) {
      localStorage.setItem(this.EMPLOYEE_SETUP_KEY, "true");
    }
  }

  public logout(): void {
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.COMPANY_ID_KEY);
    localStorage.removeItem(this.EMPLOYEE_SETUP_KEY);

    // Clear the access token from API configuration

    this.userSubject.next(null);
    this._router.navigate([ROUTES.LOGIN]);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    // Also set the access token in API configuration
  }

  public getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) ?? "";
  }

  public getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  // Observable getters for user data
  public getUserData(): SignInResponseDto {
    return JSON.parse(localStorage.getItem(this.USERNAME_KEY) ?? "{}") as SignInResponseDto;
  }

  public get user$(): Observable<SignInResponseDtoUser | null> {
    return this.userSubject.asObservable();
  }

  public get userEmail$(): Observable<string> {
    return this.user$.pipe(map((user) => user?.email || ""));
  }

  public get userFirstName$(): Observable<string> {
    return this.user$.pipe(map((user) => user?.employee?.first_name || ""));
  }

  public get userLastName$(): Observable<string> {
    return this.user$.pipe(map((user) => user?.employee?.last_name || ""));
  }

  public get role$(): Observable<string> {
    return this.user$.pipe(map((user) => user?.groups[0] || ""));
  }

  public get userFullName$(): Observable<string> {
    return this.user$.pipe(
      map((user) => {
        const firstName = user?.employee?.first_name || "";
        const lastName = user?.employee?.last_name || "";
        if (firstName && lastName) {
          return `${firstName} ${lastName}`;
        }
        return firstName || lastName || "";
      }),
    );
  }

  public get username$(): Observable<string> {
    return this.user$.pipe(map((user) => user?.username || ""));
  }

  public refreshAccessToken(refreshToken: string): Observable<unknown> {
    return this._auth.authControllerRefresh({ refreshToken });
  }
}
