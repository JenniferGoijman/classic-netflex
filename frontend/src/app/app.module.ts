import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './container/home/home.component';
import { LoginComponent } from './container/user/login/login.component';
import { RegisterComponent } from './container/user/register/register.component';
import { ConfirmedComponent } from './container/user/confirmed/confirmed.component';
import { MoviesComponent } from './container/movies/movies.component';
import { ProfileComponent } from './container/profile/profile.component';
import { CartComponent } from './container/cart/cart.component';
import { PopularMoviesComponent } from './components/popular-movies/popular-movies.component';


import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatVideoModule } from 'mat-video';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { OrdersMoviesComponent } from './components/orders-movies/orders-movies.component';
import { HeaderComponent } from './components/header/header.component';
import { BigTrailerComponent } from './components/big-trailer/big-trailer.component';
registerLocaleData(es);
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
    BigTrailerComponent    
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
    MatVideoModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatMenuModule,
    MatStepperModule,
    MatButtonModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    })
  ],
  providers: [BigTrailerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
