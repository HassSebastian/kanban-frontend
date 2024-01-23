import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Performs a login operation using a username and password.
   *
   * @param username The username for authentication.
   * @param password The password for authentication.
   * @returns An observable of the HTTP response containing user authentication data.
   *
   */
  public loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      username: username,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Performs user registration with provided user details.
   *
   * @param first_name The first name of the user for registration.
   * @param last_name The last name of the user for registration.
   * @param email The email address of the user for registration.
   * @param username The desired username for registration.
   * @param password The password for user registration.
   * @returns An observable of the HTTP response containing registration data.
   *
   */
  public registrWithUsernameEmailAndPassword(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password: string
  ) {
    const url = environment.baseUrl + '/regist/';
    const body = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      username: username,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Logs out the user by sending a POST request to the logout endpoint.
   *
   * @returns An observable of the HTTP response for the logout request.
   *
   */
  logout() {
    const url = environment.baseUrl + '/logout/';
    return this.http.post(url, {});
  }
}
