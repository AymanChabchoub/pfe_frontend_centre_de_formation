import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { FaceLoginComponent } from 'src/components/face-login/face-login.component';
import { CreateFormationComponent } from 'src/components/formation/create-formation/create-formation.component';
import { ListeFormationComponent } from 'src/components/formation/liste-formation/liste-formation.component';
import { ListeInscriptionBySessionIdComponent } from 'src/components/inscription/liste-inscription-by-session-id/liste-inscription-by-session-id.component';
import { ListeFormateurComponent } from 'src/components/liste-formateur/liste-formateur.component';
import { LoginComponent } from 'src/components/login/login.component';
import { RegisterComponent } from 'src/components/register/register.component';
import { CreateSalleComponent } from 'src/components/salle/create-salle/create-salle.component';
import { CreateSessionFormationComponent } from 'src/components/session_formation/create-session-formation/create-session-formation.component';
import { ListeSessionFormationByFormationIdComponent } from 'src/components/session_formation/liste-session-formation-by-formation-id/liste-session-formation-by-formation-id.component';
import { SessionFormationListComponent } from 'src/components/session_formation/session-formation-list/session-formation-list.component';
import { AssignFormateurComponent } from 'src/components/formation/assign-formateur/assign-formateur.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'liste-formateur', component: ListeFormateurComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-salle', component: CreateSalleComponent },
  { path: 'create-formation', component: CreateFormationComponent },
  { path: 'create-session-formation', component: CreateSessionFormationComponent },
  { path: 'liste-formation', component: ListeFormationComponent },
  { path: 'assign-formateur', component: AssignFormateurComponent },
  { path: 'sessions/:formationId', component: ListeSessionFormationByFormationIdComponent },
  { path: 'face-login', component: FaceLoginComponent },
  { path: 'liste-sessions', component: SessionFormationListComponent },
  { path: 'liste-inscriptions-by-session-id/:sessionId', component: ListeInscriptionBySessionIdComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
