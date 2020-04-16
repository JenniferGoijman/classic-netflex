import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';

export interface Movie {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource;
  length = 50;
  pageIndex = 0;
  pageSize = 5;
  pageEvent: PageEvent;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;
  public allMovies;
  Movie = []
  showTrailer;
  showTrailerDetails;
  public infoMovie;

  constructor(public movieService: MovieService,
    private changeDetectorRef: ChangeDetectorRef,
    public sanitizer: DomSanitizer,
    public cartService: CartService) { }

  ngOnInit(): void {
    this.movieService.getPopular()
      .subscribe(res => {
        this.allMovies = res.results;
        this.changeDetectorRef.detectChanges();
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.hasPreviousPage = false;
        this.hasNextPage = true;
        this.allMovies.forEach(m => { this.Movie.push({ id: m.id, title: m.title, image: m.backdrop_path }) })
        this.dataSource = new MatTableDataSource<Movie>(this.Movie);
        this.movieService.getTrailer(this.allMovies[0].id)
          .subscribe(res => {
            this.showTrailer = "https://www.youtube.com/embed/" + res['results'][0]['key'] + "?rel=0&autohide=1&mute=1&showinfo=0&autoplay=1"
          }, error => console.error(error));
        this.obs = this.dataSource.connect();
      },
        error => console.error(error));
  }

  nextPage() {
    this.dataSource.paginator.nextPage();
    this.updateNextAndPreviousPage();
  }
  previousPage() {
    this.dataSource.paginator.previousPage();
    this.updateNextAndPreviousPage();
  }
  updateNextAndPreviousPage() {
    this.hasPreviousPage = this.dataSource.paginator.hasPreviousPage();
    this.hasNextPage = this.dataSource.paginator.hasNextPage();
  }

  public pageChange(event?: PageEvent) {
    console.log(event);
    console.log(this.dataSource)
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  getMovieById(movieId) {
    console.log(movieId);
    this.movieService.getById(movieId)
      .subscribe(res => {
        this.infoMovie = res;
        console.log(this.infoMovie);
        this.movieService.getTrailer(movieId)
          .subscribe(res => {
            this.showTrailerDetails = "https://www.youtube.com/embed/" + res['results'][0]['key'] + "?rel=0&autohide=1&mute=1&showinfo=0&autoplay=1"
          }, error => console.error(error));
      },
        error => console.error(error));
  }

  closeDetails() {
    this.infoMovie = '';
    this.showTrailerDetails = '';
  }

  time_convert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} h ${minutes} min`;
  }

  addCart(movie) {
    if (this.cartService.moviesInCart.find((m)=>m.id===movie.id))return;
    this.cartService.moviesInCart.push(movie);
    localStorage.setItem('cart', JSON.stringify(this.cartService.moviesInCart))
  }
}