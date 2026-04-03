import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isEditMode: boolean = false;
  formationId!: number;

  constructor(
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.formationId = +id;
        this.loadFormation(this.formationId);
      }
    });
  }

  loadFormation(id: number): void {
    this.isLoading = true;
    this.formationService.getById(id).subscribe(
      res => {
        this.titre = res.titre;
        this.description = res.description;
        this.dureeHeures = res.dureeHeures;
        this.prix = res.prix;
        this.isLoading = false;
      },
      err => {
        console.error('Erreur chargement formation', err);
        this.errorMessage = 'Impossible de charger les données de la formation.';
        this.isLoading = false;
      }
    );
  }

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

    if (this.isEditMode) {
      this.formationService.update(this.formationId, formation).subscribe({
        next: () => {
          this.successMessage = 'Formation modifiée avec succès ✅';
          this.isLoading = false;
          setTimeout(() => this.router.navigate(['/liste-formation']), 1500);
        },
        error: err => {
          console.error('Erreur lors de la modification:', err);
          this.errorMessage = 'Erreur lors de la modification de la formation ❌';
          this.isLoading = false;
        }
      });
    } else {
      this.formationService.ajouter(formation).subscribe({
        next: () => {
          this.successMessage = 'Formation créée avec succès ✅';
          this.titre = '';
          this.description = '';
          this.dureeHeures = 0;
          this.prix = 0;
          this.isLoading = false;
        },
        error: err => {
          console.error('Erreur lors de la création:', err);
          this.errorMessage = 'Erreur lors de la création de la formation ❌';
          this.isLoading = false;
        }
      });
    }
  }
}
