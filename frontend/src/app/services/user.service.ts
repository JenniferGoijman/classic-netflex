import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: object = {};
  private token: string = "";
  constructor(public httpClient: HttpClient) { }

  register(user: object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/users/register', user);
  }
  login(user: object): Observable<any> {
    return this.httpClient.post('http://localhost:3000/users/login', user);
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
  getUserInfo(token: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/users/info', {
      headers: { authorization: token }
    })
  }
  confirm(emailToken: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/confirm/' + emailToken);
  }
}