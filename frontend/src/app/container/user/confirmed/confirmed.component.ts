import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.scss']
})
export class ConfirmedComponent implements OnInit {
  email: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService) { }

  ngOnInit(): void { //CHEQUEAR
    const token = this.route.snapshot.params.token;
    // this.userService.getUserInfo(token)
    //   .subscribe(
    //     res => this.userService.setUser(res)
    //   )
    localStorage.setItem('authToken', token);
    this.userService.confirm(token)
      .subscribe(
        res => console.log(res)
      )

    
    // setTimeout(() => {
    //   this.router.navigate(['']);
    // }, 3000);
  }
}
