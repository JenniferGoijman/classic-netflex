import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';

export interface Movie {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-genre-movies',
  templateUrl: './genre-movies.component.html',
  styleUrls: ['./genre-movies.component.scss']
})
export class GenreMoviesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource;
  length = 50;
  pageIndex = 0;
  pageSize = 10;
  pageEvent: PageEvent;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;
  public allMovies;
  Movie = []
  showTrailerDetails;
  public infoMovie;

  constructor(public movieService: MovieService,
    public cartService: CartService,
    public sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.movieService)
     this.movieService.genre.subscribe(genre=>{
      const genreId =genre['id'];
      console.log("ngOnInit GenreMovies", genreId);
    if (genreId) {
      console.log("HOLAAAAAAAAAA")
      this.movieService.getByGenre(genreId)
        .subscribe(res => {
          this.allMovies = res['results'];
          this.changeDetectorRef.detectChanges();
          //setTimeout(() => this.dataSource.paginator = this.paginator);
          //this.hasPreviousPage = false;
          //this.hasNextPage = false;
          this.allMovies.forEach(m => {
            this.Movie.push({
              id: m.id, title: m.title, image: m.backdrop_path
            })
          })
          console.log(this.Movie)
          //this.dataSource = new MatTableDataSource<Movie>(this.Movie);
          console.log(this.dataSource)
          
          //this.obs = this.dataSource.connect();
        },
          error => console.error(error));
    }
    })
    
  }

  getMovieById(movieId) {
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

  time_convert(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} h ${minutes} min`;
  }

  closeDetails() {
    this.infoMovie = '';
    this.showTrailerDetails = '';
    this.movieService.showMovieDetails = false;
  }

  addCart(movie) {
    if (this.cartService.moviesInCart.find((m) => m.id === movie.id)) return;
    this.cartService.moviesInCart.push(movie);
    localStorage.setItem('cart', JSON.stringify(this.cartService.moviesInCart))
  }

}
