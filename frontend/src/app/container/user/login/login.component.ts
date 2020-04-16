import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
//import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public userService: UserService, public router: Router,
    //public notification:NzNotificationService
  ) {
  }

  ngOnInit(): void {
  }


  submit() {
    if (this.form.valid) {
      const user = this.form.value;
      this.userService.login(user)
        .subscribe(
          (res: HttpResponse<any>) => {
            localStorage.setItem('authToken', res['token']);
            this.userService.setUser(res['user']);
            this.userService.setToken(res['token']);
            localStorage.setItem('authToken', res['token']);
            setTimeout(()=> { this.router.navigate(['/movies'])})
            //this.notification.success('Login realizado con éxito', res['message']);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            //this.notification.error('Problema al intentar conectarte', error['error']['message']);
          }
        )
      this.form.reset();
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
