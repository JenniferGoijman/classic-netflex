import { Component } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'netflex';

  constructor(public userService: UserService) { }


  ngOnInit() {
    const token: string = localStorage.getItem('authToken');
    if (token) {
      this.userService.getUserInfo(token)
        .subscribe(
          (res: HttpResponse<object>) => this.userService.setUser(res),
          (error: HttpErrorResponse) => {
            console.error(error);
            localStorage.removeItem('authToken');
          }
        )
    }
  }
}
