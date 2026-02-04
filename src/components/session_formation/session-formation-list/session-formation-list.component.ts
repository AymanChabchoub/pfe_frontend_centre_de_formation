import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionFormationService } from 'src/services/session_formation/sessionformation.service';
import { InscriptionService } from 'src/services/inscription/inscription.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-session-formation-list',
  templateUrl: './session-formation-list.component.html',
  styleUrls: ['./session-formation-list.component.css']
})
export class SessionFormationListComponent implements OnInit {

  sessions: any[] = [];
  formationId!: number;
  loading = false;
  errorMessage = '';

  constructor(
    private sessionService: SessionFormationService,
    private inscriptionService: InscriptionService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    // Récupérer l'id de la formation depuis l'URL
    this.formationId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.formationId) {
      this.loadSessionsByFormation();
    } else {
      this.loadAllSessions();
    }
  }

  // 🔹 Toutes les sessions
  loadAllSessions(): void {
    this.loading = true;
    this.sessionService.getAll().subscribe({
      next: (data) => {
        this.sessions = data;
        this.loadInscriptionCounts();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des sessions';
        this.loading = false;
      }
    });
  }

  // 🔹 Sessions par formation
  loadSessionsByFormation(): void {
    this.loading = true;
    this.sessionService.getByFormationId(this.formationId).subscribe({
      next: (data) => {
        this.sessions = data;
        this.loadInscriptionCounts();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Aucune session trouvée pour cette formation';
        this.loading = false;
      }
    });
  }

  // 🔹 Charger le nombre d'inscriptions pour chaque session
  loadInscriptionCounts(): void {
    if (this.sessions.length === 0) return;

    const requests = this.sessions.map(session =>
      this.inscriptionService.getBySession(session.id)
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        results.forEach((inscriptions, index) => {
          this.sessions[index].inscriptionCount = inscriptions.length;
        });
      },
      error: () => {
        // En cas d'erreur, mettre 0 par défaut
        this.sessions.forEach(session => session.inscriptionCount = 0);
      }
    });
  }

  goToInscriptions(sessionId: number): void {
    this.router.navigate(['/liste-inscriptions-by-session-id', sessionId]);
  }

}
