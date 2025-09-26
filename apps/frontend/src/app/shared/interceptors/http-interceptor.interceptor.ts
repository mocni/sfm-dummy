import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, switchMap, throwError, Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private auth: AuthService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the access token from the service.
    const authToken = this.auth.getAccessToken();

    // Clone the request to add the authorization header.
    const authReq = this.addToken(httpRequest, authToken);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isRefreshing) {
          // Token expired, handle refresh logic
          return this.handleTokenExpired(httpRequest, next);
        } else if (error.status === 401 && this.isRefreshing) {
          // If already refreshing, wait for the new token
          return this.refreshTokenSubject.pipe(
            switchMap((newToken) => {
              return next.handle(this.addToken(httpRequest, newToken));
            }),
            catchError((err) => {
              // Failed to get a new token
              this.auth.logout();
              return throwError(() => err);
            }),
          );
        }
        // Other errors
        return throwError(() => error);
      }),
    );
  }

  private handleTokenExpired(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null); // Reset the refreshTokenSubject

    // Call the refresh token endpoint to get a new access token
    return this.auth.refreshAccessToken(this.auth.getRefreshToken()).pipe(
      switchMap((response: any) => {
        this.isRefreshing = false;

        // Assuming response contains the new access token
        const newAccessToken = response.access_token;
        this.auth.setAccessToken(newAccessToken); // Update access token in the AuthService
        this.refreshTokenSubject.next(newAccessToken);

        // Retry the original request with the new access token
        return next.handle(this.addToken(request, newAccessToken));
      }),
      catchError((error) => {
        this.isRefreshing = false;

        // Handle refresh token error (e.g., redirect to login page)
        this.auth.logout();
        return throwError(() => error);
      }),
    );
  }

  private addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }
}
