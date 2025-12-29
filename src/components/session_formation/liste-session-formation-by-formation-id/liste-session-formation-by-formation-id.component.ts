import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionFormationService } from 'src/services/session_formation/sessionformation.service';
import { AuthService } from 'src/services/auth/auth.service';
import { SalleService } from 'src/services/salle/salle.service';
import { InscriptionService } from 'src/services/inscription/inscription.service';

@Component({
  selector: 'app-liste-session-formation-by-formation-id',
  templateUrl: './liste-session-formation-by-formation-id.component.html',
  styleUrls: ['./liste-session-formation-by-formation-id.component.css']
})
export class ListeSessionFormationByFormationIdComponent implements OnInit {

  formationId!: number;
  sessions: any[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  currentUserId!: undefined | number;

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionFormationService,
    private authService: AuthService,
    private salleService: SalleService,
    private inscriptionService: InscriptionService
  ) {}

  ngOnInit(): void {
    this.formationId = Number(this.route.snapshot.paramMap.get('formationId'));

    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUserId = user.id;
    }

    this.loadSessions();
  }

  loadSessions(): void {
    this.isLoading = true;

    this.sessionService.getByFormationId(this.formationId).subscribe(
      res => {
        this.sessions = res;

        this.sessions.forEach(s => {

          if (s.formateurId) {
            this.authService.getUserById(s.formateurId).subscribe(user => {
              s.formateurNom = user.nom + ' ' + user.prenom;
            });
          }

          if (s.salleId) {
            this.salleService.getById(s.salleId).subscribe(salle => {
              s.salleNom = salle.nom;
              s.salleAdresse = salle.adresse;
            });
          }
        });

        this.isLoading = false;
      },
      () => this.isLoading = false
    );
  }

  // ✅ INSCRIPTION
  inscrire(sessionId: number): void {
    if (!this.currentUserId) {
      this.errorMessage = 'Vous devez être connecté pour vous inscrire';
      return;
    }

    const inscription = {
      userId: this.currentUserId,
      sessionId: sessionId
    };

    this.inscriptionService.create(inscription).subscribe(
      () => {
        this.successMessage = 'Inscription effectuée avec succès';
        this.errorMessage = '';
      },
      err => {
        this.errorMessage = err.error?.message || 'Déjà inscrit ou erreur serveur';
        this.successMessage = '';
      }
    );
  }
}
