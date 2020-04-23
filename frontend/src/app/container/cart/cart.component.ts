import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  isLinear = false;
  movie;

  form: FormGroup = new FormGroup({
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl('')
  });

  constructor(private _formBuilder: FormBuilder,
    public cartService: CartService,
    public userService: UserService,
    public orderService: OrderService,
    public router: Router,
    public snackBar: MatSnackBar) { }

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

    this.orderService.insert(token, order)
      .subscribe(res => {
        res;
        setTimeout(() => { this.router.navigate(['/movies']) })
        this.snackBar.open('Pedido realizado con éxito', 'Aceptar', {
          duration: 2000,
        })
      },
        error => console.error(error));

    localStorage.removeItem('cart');
    this.cartService.moviesInCart = [];
  }

  closeDetails() {
    this.movie = '';
    localStorage.removeItem('cart');
    this.cartService.moviesInCart = [];
    setTimeout(() => { this.router.navigate(['/movies']) })
    this.snackBar.open('Pelicula eliminada del carrito', 'Elija otra', {
      duration: 2000,
    })
  }

  time_convert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} h ${minutes} min`;
  }

  submit() {
    if (this.form.valid) {
      const address = this.form.value;
    }
  }
}
