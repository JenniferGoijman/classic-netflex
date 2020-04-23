import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'
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

  constructor(public userService: UserService, 
    public router: Router, 
    public snackBar: MatSnackBar
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
            setTimeout(() => { this.router.navigate(['/movies']) })
            this.snackBar.open('Login realizado con éxito', res['message'], {
              duration: 2000,
            })
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.snackBar.open('Problema al intentar conectarte', error['error']['message'], {
              duration: 2000,
            })
          }
        )
      this.form.reset();
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
