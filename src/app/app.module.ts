import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from 'src/components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from 'src/components/login/login.component';
import { UpNavComponent } from 'src/components/up-nav/up-nav.component';
import { LeftNavComponent } from 'src/components/left-nav/left-nav.component';
import { ListeFormateurComponent } from 'src/components/liste-formateur/liste-formateur.component';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts'; // <-- AJOUTER
import { CreateSalleComponent } from 'src/components/salle/create-salle/create-salle.component';
import { CreateFormationComponent } from 'src/components/formation/create-formation/create-formation.component';
import { CreateSessionFormationComponent } from 'src/components/session_formation/create-session-formation/create-session-formation.component';
import { ListeFormationComponent } from 'src/components/formation/liste-formation/liste-formation.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UpNavComponent,
    LeftNavComponent,
    ListeFormateurComponent,
    DashboardComponent,
    CreateSalleComponent,
    CreateFormationComponent,
    CreateSessionFormationComponent,
    ListeFormationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    HttpClientModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
