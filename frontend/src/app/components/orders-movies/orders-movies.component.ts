import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { MovieService } from 'src/app/services/movie.service';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from 'src/app/services/cart.service';

export interface Movie {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-orders-movies',
  templateUrl: './orders-movies.component.html',
  styleUrls: ['./orders-movies.component.scss']
})
export class OrdersMoviesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  orders: Observable<any>;
  dataSource;
  length = 50;
  pageIndex = 0;
  pageSize = 5;
  pageEvent: PageEvent;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;
  public allOrders;
  Movie = [];
  public infoMovie;
  showTrailerDetails;

  constructor(
    public movieService: MovieService,
    public cartService: CartService,
    private changeDetectorRef: ChangeDetectorRef,
    public orderService: OrderService
  ) { }

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
          this.hasPreviousPage = false;
          this.hasNextPage = true;
          this.allOrders.forEach((m,i,orders) => {
            this.movieService.getById(m.movieId)
              .subscribe(res => {
                this.Movie.push({
                  id: res['id'], title: res['title'], image: res['backdrop_path']
                })
                if(i===orders.length-1){
                  console.log(this.Movie)
                  this.dataSource = new MatTableDataSource<Movie>(this.Movie);
                  console.log(this.dataSource);
                  this.orders = this.dataSource.connect();
                  console.log("this.orders:", this.orders)
                  setTimeout(() => this.dataSource.paginator = this.paginator);
                }
              })
          })
        },
          error => console.error(error));
    }
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
