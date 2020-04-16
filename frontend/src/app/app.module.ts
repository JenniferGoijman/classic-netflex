import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './container/home/home.component';
import { LoginComponent } from './container/user/login/login.component';
import { RegisterComponent } from './container/user/register/register.component';
import { ConfirmedComponent } from './container/user/confirmed/confirmed.component';
import { MoviesComponent } from './container/movies/movies.component';

//import { NgZorroAntdModule, NZ_I18N, es_ES } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatVideoModule } from 'mat-video';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
registerLocaleData(es);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmedComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //NgZorroAntdModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatVideoModule,
    MatPaginatorModule,
    MatBadgeModule
  ],
  //providers: [{provide: NZ_I18N, useValue: es_ES  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
