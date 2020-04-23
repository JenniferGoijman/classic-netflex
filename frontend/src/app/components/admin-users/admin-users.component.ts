import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface User {
  name: string;
  surname: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users;
  User= [];
  dataSource;
  displayedColumns: string[] = ['name', 'surname', 'email', 'role'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe(res => {
        this.users = res;
        this.users.forEach(u => {
          this.User.push({name: u.name, surname: u.surname, email:u.email, role:u.role})
        })
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.sort = this.sort;
      }, error => console.error(error));
  }

}
