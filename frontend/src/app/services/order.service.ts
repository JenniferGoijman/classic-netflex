import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(environment.API_URL + 'orders')
  }
  getByUser(token) {
    return this.httpClient.get(environment.API_URL + 'orders/user', {
      headers: { 'authorization': token }
    })
  }
  insert(token, order): Observable<any> {
    return this.httpClient.post(environment.API_URL + 'orders', order, {
      headers: { authorization: token }
    });
  }
}