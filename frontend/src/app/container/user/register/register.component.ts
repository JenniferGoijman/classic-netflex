import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(public userService:UserService, public router:Router) {
  }

  ngOnInit(): void {
  }
  
  submit() {
    if (this.form.valid) {
      const user =this.form.value;
      this.userService.register(user)
      .subscribe(
        (res:HttpResponse<object>) =>{
          this.notification.success(
            'Registro realizado con éxito',
            res['message']
            );
            setTimeout(() => {
              this.router.navigate(['login'])
            }, 2500);
        },
        (error:HttpErrorResponse)=>{
          this.notification.error(
            'Problema al registrar usuario',
            error['error']['message']
            );
        }
      )
      this.form.reset();
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
