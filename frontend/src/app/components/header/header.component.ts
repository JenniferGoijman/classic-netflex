import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public genres;
  languageFlag = 'n1';

  constructor(public userService: UserService,
    public cartService: CartService,
    public movieService: MovieService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.movieService.getGenres()
      .subscribe(res => { this.genres = res['genres'];
      console.log(this.genres) },
        error => console.error(error));
  }

  loadMoviesByGenre(genre) {
    console.log(genre.name)
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.userService['user'] = {};
    localStorage.removeItem('cart');
    this.cartService.moviesInCart = [];
  }

}
