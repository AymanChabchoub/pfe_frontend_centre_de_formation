import { Component } from '@angular/core';
import { FormationService } from 'src/services/formation/formation.service';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.css']
})
export class CreateFormationComponent {
  titre: string = '';
  description: string = '';
  dureeHeures!: number;
  prix!: number;

  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private formationService: FormationService) { }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.titre || !this.description || !this.dureeHeures || this.dureeHeures <= 0 ||
      !this.prix || this.prix < 0) {
      console.warn('Veuillez remplir tous les champs correctement.');
      return;
    }

    const formation = {
      titre: this.titre,
      description: this.description,
      dureeHeures: this.dureeHeures,
      prix: this.prix
    };

    this.isLoading = true;
    this.formationService.ajouter(formation).subscribe(
      res => {
        this.successMessage = 'Formation créée avec succès ✅';
        console.log('Formation créée avec succès:', res);
        // Réinitialiser le formulaire
        this.titre = '';
        this.description = '';
        this.dureeHeures = 0;
        this.prix = 0;
        this.isLoading = false;
      },
      err => {
        console.error('Erreur lors de la création de la formation:', err);
        this.errorMessage = 'Erreur lors de la création de la formation ❌';
        this.isLoading = false;
      }
    );
  }
}
