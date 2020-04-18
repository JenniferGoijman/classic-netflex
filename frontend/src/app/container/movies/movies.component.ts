import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

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

export class MoviesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator2: MatPaginator;
  orders: Observable<any>;
  dataSource2;
  length = 50;
  pageIndex = 0;
  pageSize = 5;
  pageEvent: PageEvent;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;
  public allOrders;
  MovieOrder = []
  public mov;
  showTrailer;
  public infoMovie;

  constructor(public movieService: MovieService,
    public sanitizer: DomSanitizer,
    public userService: UserService,
    public cartService: CartService,
    private changeDetectorRef: ChangeDetectorRef,
    public orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.orderService.getByUser(token)
        .subscribe(res => {
          this.allOrders = res;
          this.changeDetectorRef.detectChanges();
          //setTimeout(() => this.dataSource2.paginator = this.paginator2);
          // this.hasPreviousPage = false;
          // this.hasNextPage = true;
          this.allOrders.forEach(m => {
            this.movieService.getById(m.movieId)
              .subscribe(res => {
                this.mov = res;
                this.MovieOrder.push({
                  id: this.mov.id, title: this.mov.title, image: this.mov.backdrop_path
                })
              },
                error => console.error(error));
          })
          this.dataSource2 = new MatTableDataSource<Movie>(this.MovieOrder);
          // this.movieService.getTrailer(this.allMovies[0].id)
          //   .subscribe(res => {
          //     this.showTrailer = "https://www.youtube.com/embed/" + res['results'][0]['key'] + "?rel=0&autohide=1&mute=1&showinfo=0&autoplay=1"
          //   }, error => console.error(error));
          this.orders = this.dataSource2.connect();
        },
          error => console.error(error));
    }
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.userService['user'] = {};
    localStorage.removeItem('cart');
    this.cartService.moviesInCart = [];
  }

  getMovieById(movieId) {
    this.movieService.getById(movieId)
      .subscribe(res => {
        this.infoMovie = res;
        console.log(this.infoMovie);
        this.movieService.showMovieDetails = true;
        // this.movieService.getTrailer(movieId)
        //   .subscribe(res => {
        //     this.showTrailerDetails = "https://www.youtube.com/embed/" + res['results'][0]['key'] + "?rel=0&autohide=1&mute=1&showinfo=0&autoplay=1"
        //   }, error => console.error(error));
      },
        error => console.error(error));
  }


  nextPage() {
    this.dataSource2.paginator.nextPage();
    this.updateNextAndPreviousPage();
  }
  previousPage() {
    this.dataSource2.paginator.previousPage();
    this.updateNextAndPreviousPage();
  }
  updateNextAndPreviousPage() {
    this.hasPreviousPage = this.dataSource2.paginator.hasPreviousPage();
    this.hasNextPage = this.dataSource2.paginator.hasNextPage();
  }
}