import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { FaceLoginComponent } from 'src/components/face-login/face-login.component';
import { CreateFormationComponent } from 'src/components/formation/create-formation/create-formation.component';
import { ListeFormationComponent } from 'src/components/formation/liste-formation/liste-formation.component';
import { ListeFormateurComponent } from 'src/components/liste-formateur/liste-formateur.component';
import { LoginComponent } from 'src/components/login/login.component';
import { RegisterComponent } from 'src/components/register/register.component';
import { CreateSalleComponent } from 'src/components/salle/create-salle/create-salle.component';
import { CreateSessionFormationComponent } from 'src/components/session_formation/create-session-formation/create-session-formation.component';
import { ListeSessionFormationByFormationIdComponent } from 'src/components/session_formation/liste-session-formation-by-formation-id/liste-session-formation-by-formation-id.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'liste-formateur',component:ListeFormateurComponent},
  { path:'dashboard',component:DashboardComponent},
  { path: 'create-salle', component: CreateSalleComponent },
  { path: 'create-formation', component: CreateFormationComponent },
  { path: 'create-session-formation', component: CreateSessionFormationComponent },
  { path: 'liste-formation', component: ListeFormationComponent },
  { path: 'sessions/:formationId',component: ListeSessionFormationByFormationIdComponent},
  { path: 'face-login', component: FaceLoginComponent }
 

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
