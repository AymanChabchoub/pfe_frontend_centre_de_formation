import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from 'src/components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from 'src/components/login/login.component';
import { UpNavComponent } from 'src/components/up-nav/up-nav.component';
import { LeftNavComponent } from 'src/components/left-nav/left-nav.component';
import { ListeFormateurComponent } from 'src/components/liste-formateur/liste-formateur.component';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UpNavComponent,
    LeftNavComponent,
    ListeFormateurComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
