import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { MovieService } from 'src/app/services/movie.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchElement: ElementRef;
  public genres;
  showInputSearch;
  showImageSearch;
  genre = new BehaviorSubject({});

  constructor(public userService: UserService,
    public cartService: CartService,
    public movieService: MovieService,
    public router: Router) { }

  ngOnInit(): void {
    this.getGenres();
    this.showInputSearch = false;
    this.showImageSearch = true;
    console.log(this.router)
  }

  searchMoviesActors() {
    const search = this.searchElement.nativeElement.value;
    if (search != '') {
      console.log(search)
      this.movieService.showSearchResults = true;
      this.movieService.showBigTrailer = false;
      this.movieService.showPopularMovies = false;
      this.movieService.showOrderMovies = false;
      this.movieService.showGenreMovies = false;
      this.router.navigate(['/search', search]);
    }
  }

  getGenres() {
    this.movieService.getGenres()
      .subscribe(res => {
        this.genres = res['genres'];
        console.log(this.genres)
      },
        error => console.error(error));
  }

  loadMoviesByGenre(genre) {
    this.router.navigate(['/movies']);
    this.movieService.showPopularMovies = false;
    this.movieService.showOrderMovies = false;
    this.movieService.showBigTrailer = false;
    this.movieService.showSearchResults = false;
    this.movieService.showGenreMovies = true;
    console.log(this.movieService)
    this.movieService.genre.next(genre);
  }

  loadMoviesHome() {
    this.router.navigate(['/movies']);
    this.movieService.showPopularMovies = true;
    this.movieService.showOrderMovies = true;
    this.movieService.showBigTrailer = true;
    this.movieService.showSearchResults = false;
    this.movieService.showGenreMovies = false;
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.userService['user'] = {};
    localStorage.removeItem('cart');
    this.cartService.moviesInCart = [];
    this.router.navigate(['']);
  }

  showSearchInput() {
    this.showInputSearch = true;
    this.showImageSearch = false;
    setTimeout(() => { this.searchElement.nativeElement.focus(); }, 0);
  }

  hideSearchInput() {
    if (this.searchElement.nativeElement.value === '') {
      this.showInputSearch = false;
      this.showImageSearch = true;
    }

  }
}
