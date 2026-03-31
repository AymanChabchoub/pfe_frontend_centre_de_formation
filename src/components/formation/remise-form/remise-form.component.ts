import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from 'src/services/formation/formation.service';
import { Formation } from 'src/models/Formation';

@Component({
  selector: 'app-remise-form',
  templateUrl: './remise-form.component.html',
  styleUrls: ['./remise-form.component.css']
})
export class RemiseFormComponent implements OnInit {

  formations: Formation[] = [];
  selectedFormationId: number | null = null;
  tauxRemise: number = 0;
  dateExpiration: string = '';

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formationService: FormationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.isLoading = true;
    this.formationService.getAll().subscribe(
      data => {
        this.formations = data;
        this.isLoading = false;
      },
      err => {
        console.error('Erreur chargement formations', err);
        this.isLoading = false;
      }
    );
  }

  appliquerRemise(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.selectedFormationId) {
      this.errorMessage = 'Veuillez sélectionner une formation.';
      return;
    }

    const f = this.formations.find(x => x.id === Number(this.selectedFormationId));
    if (f) {
      this.isLoading = true;
      f.tauxRemise = this.tauxRemise;
      f.dateExpirationRemise = this.dateExpiration;
      
      this.formationService.update(f.id!, f).subscribe(
        
        res => {
          console.log(res);
          this.successMessage = 'Remise appliquée avec succès ✅';
          this.isLoading = false;
          // Optionnel: réinitialiser ou rediriger
        },
        err => {
          console.error('Erreur application remise', err);
          this.errorMessage = 'Erreur lors de l\'application de la remise ❌';
          this.isLoading = false;
        }
      );
    }
  }

  goToListeFormation(): void {
    this.router.navigate(['/liste-formation']);
  }

}
