import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';

export interface User {
  name: string;
  surname: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users;
  User= [];
  dataSource;
  displayedColumns: string[] = ['name', 'surname', 'email', 'role'];
 
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe(res => {
        this.users = res;
        this.users.forEach(u => {
          this.User.push({name: u.name, surname: u.surname, email:u.email, role:u.role})
        })
        this.dataSource = new MatTableDataSource<User>(this.users);
      }, error => console.error(error));
  }
}
