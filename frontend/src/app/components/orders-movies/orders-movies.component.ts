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
  showMovieDetails = false;

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
    this.showMovieDetails = true;
    this.movieService.movieIdDetails.next(movieId);
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
}
