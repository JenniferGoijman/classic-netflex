import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './container/home/home.component';
import { LoginComponent } from './container/user/login/login.component';
import { RegisterComponent } from './container/user/register/register.component';
import { ConfirmedComponent } from './container/user/confirmed/confirmed.component';
import { MoviesComponent } from './container/movies/movies.component';
import { ProfileComponent } from './container/profile/profile.component';
import { CartComponent } from './container/cart/cart.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users/confirm/:token', component: ConfirmedComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
