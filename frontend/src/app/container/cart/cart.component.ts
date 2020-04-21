import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  movie;
  
  constructor(private _formBuilder: FormBuilder,
    public cartService: CartService,
    public userService: UserService,
    public orderService: OrderService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.movie = this.cartService.moviesInCart[0];
  }

  insertOrder() {
    const token = localStorage.getItem('authToken');
    var today = new Date();
    const order = {
      "date": today.toLocaleDateString().split('/').reverse().join('-') + ' ' + today.toLocaleTimeString(),
      "status": "pending",
      "UserId": this.userService.getUser(),
      "movieId": this.movie.id,
      "days": 3,
      "amount": 6.5,
      "estimatedDeliveryDate": "2020-04-25 00:00:00"
    }
    console.log(token, order)

    this.orderService.insert(token, order)
      .subscribe(res => { res; },
        error => console.error(error));

    localStorage.removeItem('cart');
    this.cartService.moviesInCart = [];

  }

  deleteProduct(productId, event) {
    event.target.parentNode.parentNode.remove()
    const productsFiltered = this.cartService.moviesInCart.filter(p => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(productsFiltered));
    this.cartService.moviesInCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }

  closeDetails() {
    this.movie = '';
  }

  time_convert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} h ${minutes} min`;
  }
}
