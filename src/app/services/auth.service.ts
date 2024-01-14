import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public loginWithUsernameAndPassword(
    username: string,
    password: string
  ) {
    const url = environment.baseUrl + '/login/';
    const body = {
      username: username,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }

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
      password1: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }
}
