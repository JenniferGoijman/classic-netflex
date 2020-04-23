import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { MatTableDataSource } from '@angular/material/table';

export interface Order {
  date: string;
  movieId: number;
  UserId: number;
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
  displayedColumns: string[] = ['date', 'movieId', 'UserId'];

  constructor(public orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll()
      .subscribe(res => {
        this.orders = res;
        // this.orders.forEach(u => {
        //   this.Order.push({name: u.name, surname: u.surname, email:u.email, role:u.role})
        // })
        this.dataSource = new MatTableDataSource<Order>(this.orders);
      }, error => console.error(error));
  }

}
