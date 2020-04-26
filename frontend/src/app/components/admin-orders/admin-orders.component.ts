import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface Order {
  date: string;
  movieId: number;
  UserId: number;
  status: number;
}

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders;
  Order= [];
  dataSource;
  displayedColumns: string[] = ['date', 'movieId', 'UserId', 'status'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(public orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll()
      .subscribe(res => {
        this.orders = res;
        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.sort = this.sort;
      }, error => console.error(error));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
