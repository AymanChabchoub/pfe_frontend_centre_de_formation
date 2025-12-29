import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { FormationService } from 'src/services/formation/formation.service';

@Component({
  selector: 'app-liste-formation',
  templateUrl: './liste-formation.component.html',
  styleUrls: ['./liste-formation.component.css']
})
export class ListeFormationComponent implements OnInit {

    formations: any[] = [];
  isLoading = false;

  constructor(
    private formationService: FormationService,
    private authService: AuthService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.isLoading = true;

    this.formationService.getAll().subscribe(
      res => {
        this.formations = res;

        // Pour chaque formation, charger le formateur
        this.formations.forEach(f => {
          if (f.formateurId) {
            this.authService.getUserById(f.formateurId).subscribe(
              user => {
                f.formateurNom = user.nom + ' ' + user.prenom;
              },
              () => {
                f.formateurNom = 'Inconnu';
              }
            );
          } else {
            f.formateurNom = '—';
          }
        });

        this.isLoading = false;
      },
      err => {
        console.error('Erreur chargement formations', err);
        this.isLoading = false;
      }
    );
  }

  deleteFormation(id: number): void {
    if (!confirm('Voulez-vous supprimer cette formation ?')) {
      return;
    }

    this.formationService.delete(id).subscribe(
      () => {
        this.formations = this.formations.filter(f => f.id !== id);
      },
      err => {
        console.error('Erreur suppression formation', err);
      }
    );
  }
  goToSessions(formationId: number): void {
  this.router.navigate(['/sessions', formationId]);
}

}