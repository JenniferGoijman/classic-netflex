import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public moviesInCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  constructor() { }
}
