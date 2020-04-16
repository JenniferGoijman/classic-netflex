import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public orders;
  public user;

  constructor(public orderService:OrderService, 
    public userService:UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('authToken')
    this.orderService.getByUser(token)
      .subscribe(res => { this.orders = res; },
        error => console.error(error));
  }
}
