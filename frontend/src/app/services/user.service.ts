import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: object = {};
  private token: string = "";
  constructor(public httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(environment.API_URL + 'users')
  }
  register(user: object): Observable<any> {
    return this.httpClient.post(environment.API_URL + 'users/register', user);
  }
  login(user: object): Observable<any> {
    return this.httpClient.post(environment.API_URL + 'users/login', user);
  }
  setToken(token: string): void {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }
  setUser(user: object): void {
    this.user = user;
  }
  getUser(): object {
    return this.user;
  }
  getUserInfo(token): Observable<any> {
    return this.httpClient.get(environment.API_URL + 'users/info', {
      headers: { authorization: token }
    })
  }
}