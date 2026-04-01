import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChargeService } from 'src/services/charge/charge.service';
import { SessionFormationService } from 'src/services/session_formation/sessionformation.service';

@Component({
  selector: 'app-charge-form',
  templateUrl: './charge-form.component.html',
  styleUrls: ['./charge-form.component.css']
})
export class ChargeFormComponent implements OnInit {

  sessions: any[] = [];
  selectedSessionId!: number;
  type: string = '';
  montant: number = 0;
  description: string = '';
  dateCharge: string = '';

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  typesCharge: string[] = ['Salle', 'Formateur', 'Logistique', 'Matériel', 'Autre'];

  constructor(
    private chargeService: ChargeService,
    private sessionService: SessionFormationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.isLoading = true;
    this.sessionService.getAll().subscribe(
      res => {
        this.sessions = res;
        this.isLoading = false;
      },
      err => {
        console.error('Erreur chargement sessions', err);
        this.isLoading = false;
      }
    );
  }

  ajouterCharge(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.selectedSessionId || !this.type || this.montant <= 0) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    const charge = {
      type: this.type,
      montant: this.montant,
      description: this.description,
      dateCharge: this.dateCharge || null,
      sessionFormation: { id: this.selectedSessionId }
    };

    this.isLoading = true;
    this.chargeService.create(charge).subscribe(
      res => {
        console.log('Charge créée:', res);
        this.successMessage = 'Charge ajoutée avec succès ✅';
        this.isLoading = false;
        // Reset
        this.type = '';
        this.montant = 0;
        this.description = '';
        this.dateCharge = '';
      },
      err => {
        console.error('Erreur création charge', err);
        this.errorMessage = 'Erreur lors de l\'ajout de la charge ❌';
        this.isLoading = false;
      }
    );
  }

  goToCharges(): void {
    this.router.navigate(['/charges']);
  }
}
