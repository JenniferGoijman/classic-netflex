import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './container/home/home.component';
import { LoginComponent } from './container/user/login/login.component';
import { RegisterComponent } from './container/user/register/register.component';
import { ConfirmedComponent } from './container/user/confirmed/confirmed.component';
import { MoviesComponent } from './container/movies/movies.component';
import { ProfileComponent } from './container/profile/profile.component';
import { CartComponent } from './container/cart/cart.component';
import { SearchMoviesActorsComponent } from './components/search-movies-actors/search-movies-actors.component';
import { AdminComponent } from './container/admin/admin.component';
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { OrdersMoviesComponent } from './components/orders-movies/orders-movies.component';
import { HeaderComponent } from './components/header/header.component';
import { BigTrailerComponent } from './components/big-trailer/big-trailer.component';
import { GenreMoviesComponent } from './components/genre-movies/genre-movies.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';

import es from '@angular/common/locales/es';
registerLocaleData(es);
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmedComponent,
    MoviesComponent,
    ProfileComponent,
    CartComponent,
    PopularMoviesComponent,
    OrdersMoviesComponent,
    HeaderComponent,
    BigTrailerComponent,
    GenreMoviesComponent,
    SearchMoviesActorsComponent,
    MovieDetailsComponent,
    AdminComponent,
    AdminUsersComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatMenuModule,
    MatStepperModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule
  ],
  providers: [BigTrailerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
