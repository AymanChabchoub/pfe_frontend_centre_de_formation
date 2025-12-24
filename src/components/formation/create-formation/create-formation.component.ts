import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth/auth.service';
import { FormationService } from 'src/services/formation/formation.service';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.css']
})
export class CreateFormationComponent implements OnInit {
  titre: string = '';
  description: string = '';
  dureeHeures!: number;
  prix!: number;

  formateurId!: number;
  isLoading: boolean = false;

  users: User[] = [];
  formateurs: User[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: AuthService, private formationService: FormationService) {}

  ngOnInit(): void {
    this.loadFormateurs();
  }

  loadFormateurs(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe(
      (res: User[]) => {
        this.formateurs = res.filter(user => user.role === 'FORMATEUR');
        this.isLoading = false;
      },
      err => {
        console.error(err);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    
    this.successMessage = '';
    this.errorMessage = '';
    if (!this.titre || !this.description || !this.dureeHeures || this.dureeHeures <= 0 ||
        !this.prix || this.prix < 0  || !this.formateurId) {
      console.warn('Veuillez remplir tous les champs correctement.');
      return;
    }

    const formation = {
      titre: this.titre,
      description: this.description,
      dureeHeures: this.dureeHeures,
      prix: this.prix,

      formateurId: this.formateurId
    };

    this.isLoading = true;
    this.formationService.ajouter(formation).subscribe(
      res => {
        this.successMessage = 'formation créée avec succès ✅';
        console.log('Formation créée avec succès:', res);
        // Réinitialiser le formulaire
        this.titre = '';
        this.description = '';
        this.dureeHeures = 0;
        this.prix = 0;

        this.formateurId = 0;
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
