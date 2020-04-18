import { Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {
  showTrailer;

  constructor(
    public sanitizer: DomSanitizer,
    public userService: UserService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.userService['user'] = {};
    localStorage.removeItem('cart');
    this.cartService.moviesInCart = [];
  }

  
}