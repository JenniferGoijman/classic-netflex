import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  notification: any;

  constructor(public userService: UserService, public router: Router, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      const user = this.form.value;
      this.userService.register(user)
        .subscribe(
          (res: HttpResponse<object>) => {
            setTimeout(() => {
              this.router.navigate(['login'])
            }, 2500);
            this.snackBar.open('Registro realizado con éxito', res['message'], {
              duration: 2000,
            })
          },
          (error: HttpErrorResponse) => {
            this.snackBar.open('Problema al registrar usuario', error['error']['message'], {
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
