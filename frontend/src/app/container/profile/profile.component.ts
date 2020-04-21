import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MovieService } from 'src/app/services/movie.service';

export interface Movie {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  moviesOrders = [];
  dataSource;
  length = 50;
  pageIndex = 0;
  pageSize = 5;
  pageEvent: PageEvent;
  public hasPreviousPage: boolean;
  public hasNextPage: boolean;
  public allOrders;
  Movie = [];
  public user;

  constructor(public movieService: MovieService,
    public orderService: OrderService,
    public userService: UserService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken')
    this.getOrders();
  }

  getOrders() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.orderService.getByUser(token)
        .subscribe(res => {
          this.allOrders = res;
          this.allOrders.forEach(m => {
            this.movieService.getById(m.movieId)
              .subscribe(res => {
                this.moviesOrders.push({
                  id: m.id, date: m.date, status: m.status, Movie: {
                    id: res['id'], title: res['title'], image: res['backdrop_path']
                  }
                })
              })
          })
          console.log(this.moviesOrders)
        },
          error => console.error(error));
    }
  }
}
