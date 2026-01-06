import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from 'src/services/inscription/inscription.service';
import { PresenceService } from 'src/services/presence/presence.service';

@Component({
  selector: 'app-liste-inscription-by-session-id',
  templateUrl: './liste-inscription-by-session-id.component.html',
  styleUrls: ['./liste-inscription-by-session-id.component.css']
})
export class ListeInscriptionBySessionIdComponent implements OnInit {

  inscriptions: any[] = [];
  sessionId!: number;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private inscriptionService: InscriptionService,
      private presenceService: PresenceService

  ) {}

  ngOnInit(): void {
    this.sessionId = Number(this.route.snapshot.paramMap.get('sessionId'));
    this.loadInscriptions();
  }

  loadInscriptions(): void {
    this.loading = true;
    this.inscriptionService.getBySession(this.sessionId).subscribe({
      next: (data) => {
        this.inscriptions = data;
        console.log("data", data);
        this.loading = false;
      },
      error: () => {
        this.inscriptions = [];
        this.loading = false;
      }
    });
  }
  markPresent(inscription: any): void {

  const presencePayload = {
    participantNom:
      inscription.apprenant.nom + ' ' + inscription.apprenant.prenom,
    present: true,
    sessionFormation: {
      id: inscription.sessionFormation.id
    },
    heureArrivee: new Date().toISOString().substring(11, 19),
    date: new Date()
  };

  this.presenceService.create(presencePayload).subscribe({
    next: () => {
      inscription.present = true; // état frontend
    },
    error: (err) => {
      console.error('Erreur présence', err);
    }
  });
}

}
