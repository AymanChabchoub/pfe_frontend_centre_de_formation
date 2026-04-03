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
import { ForgotPasswordComponent } from 'src/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/components/reset-password/reset-password.component';
import { RemiseFormComponent } from 'src/components/formation/remise-form/remise-form.component';
import { ChargeFormComponent } from 'src/components/charges/charge-form/charge-form.component';
import { ChargeListComponent } from 'src/components/charges/charge-list/charge-list.component';
import { BilanFormationComponent } from 'src/components/charges/bilan-formation/bilan-formation.component';
import { ListeSallesComponent } from 'src/components/salle/liste-salles/liste-salles.component';

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
  { path: 'liste-inscriptions-by-session-id/:sessionId', component: ListeInscriptionBySessionIdComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'gestion-remises', component: RemiseFormComponent },
  { path: 'charges', component: ChargeListComponent },
  { path: 'charge-form', component: ChargeFormComponent },
  { path: 'bilan-financier', component: BilanFormationComponent },
  { path: 'update-formation/:id', component: CreateFormationComponent },
  { path: 'update-session/:id', component: CreateSessionFormationComponent },
  { path: 'liste-salles', component: ListeSallesComponent },
  { path: 'update-salle/:id', component: CreateSalleComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
