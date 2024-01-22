import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  /**
   * Interceptor for handling HTTP requests and responses.
   *
   * - Retrieves the authentication token from the local storage.
   * - If a token is available, adds the 'Authorization' header to the request.
   * - Handles errors, specifically unauthorized (status 401) responses:
   *   - Redirects to the login page if the response status is 401.
   *
   * @param request The HTTP request being intercepted.
   * @param next The HTTP handler for the next interceptor or the backend.
   * @returns An observable of the HTTP events, including the response or an error.
   *
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Token ${token}` },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => err);
      })
    );
  }
}
