import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { MovieService } from 'src/app/services/movie.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public genres;
  showInputSearch;
  showImageSearch;
  genre = new BehaviorSubject({});
  constructor(public userService: UserService,
    public cartService: CartService,
    public movieService: MovieService) { }

  ngOnInit(): void {
    this.getGenres();
    this.showInputSearch=false;
    this.showImageSearch=true;
    console.log(this.movieService)
  }

  getGenres() {
    this.movieService.getGenres()
      .subscribe(res => { this.genres = res['genres'];
      console.log(this.genres) },
        error => console.error(error));
  }

  loadMoviesByGenre(genre) {
    this.movieService.showPopularMovies = false;
    this.movieService.showOrderMovies = false;
    this.movieService.showBigTrailer = false;
    this.movieService.showGenreMovies = true;
    console.log(this.movieService)
    this.movieService.genre.next(genre);
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.userService['user'] = {};
    localStorage.removeItem('cart');
    this.cartService.moviesInCart = [];
  }

  showSearchInput(){
    this.showInputSearch=true;
    this.showImageSearch=false;
  }

  hideSearchInput(){
    this.showInputSearch=false;
    this.showImageSearch=true;
    console.log("tu vieeee")
  }
}
