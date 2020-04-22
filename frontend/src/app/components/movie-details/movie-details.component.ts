import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { CartService } from 'src/app/services/cart.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public infoMovie;
  showTrailerDetails;

  constructor(public movieService: MovieService, public cartService: CartService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    console.log(this.movieService)
    this.movieService.movieIdDetails.subscribe(m => {
      const movieId = m;
      if (movieId) {
        this.movieService.getById(movieId)
          .subscribe(res => {
            this.infoMovie = res;
            this.movieService.showMovieDetails = true;
            this.movieService.getTrailer(movieId)
              .subscribe(res => {
                this.showTrailerDetails = "https://www.youtube.com/embed/" + res['results'][0]['key'] + "?rel=0&autohide=1&mute=1&showinfo=0&autoplay=1"
              }, error => console.error(error));
          },
            error => console.error(error));
      }
    })
  }

  time_convert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} h ${minutes} min`;
  }

  closeDetails() {
    this.movieService.movieIdDetails.next({});
  }

  addCart(movie) {
    if (this.cartService.moviesInCart.find((m) => m.id === movie.id)) return;
    this.cartService.moviesInCart.push(movie);
    localStorage.setItem('cart', JSON.stringify(this.cartService.moviesInCart))
  }
}
