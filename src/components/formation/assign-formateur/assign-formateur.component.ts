import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth/auth.service';
import { FormationService } from 'src/services/formation/formation.service';

@Component({
    selector: 'app-assign-formateur',
    templateUrl: './assign-formateur.component.html',
    styleUrls: ['./assign-formateur.component.css']
})
export class AssignFormateurComponent implements OnInit {
    formations: any[] = [];
    formateurs: User[] = [];

    selectedFormationId!: number;
    selectedFormateurId!: number;

    isLoading: boolean = false;
    successMessage: string = '';
    errorMessage: string = '';

    constructor(
        private formationService: FormationService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadFormations();
        this.loadFormateurs();
    }

    loadFormations(): void {
        this.isLoading = true;
        this.formationService.getAll().subscribe(
            res => {
                this.formations = res;
                this.isLoading = false;
            },
            err => {
                console.error('Erreur chargement formations', err);
                this.isLoading = false;
            }
        );
    }

    loadFormateurs(): void {
        this.authService.getAllUsers().subscribe(
            (res: User[]) => {
                this.formateurs = res.filter(user => user.role === 'FORMATEUR');
            },
            err => {
                console.error('Erreur chargement formateurs', err);
            }
        );
    }

    assignFormateur(): void {
        this.successMessage = '';
        this.errorMessage = '';

        if (!this.selectedFormationId || !this.selectedFormateurId) {
            this.errorMessage = 'Veuillez sélectionner une formation et un formateur.';
            return;
        }

        // Récupérer la formation sélectionnée
        const formation = this.formations.find(f => f.id === this.selectedFormationId);
        if (!formation) {
            this.errorMessage = 'Formation introuvable.';
            return;
        }

        // Mettre à jour la formation avec le nouveau formateurId
        const updatedFormation = {
            titre: formation.titre,
            description: formation.description,
            dureeHeures: formation.dureeHeures,
            prix: formation.prix,
            formateurId: this.selectedFormateurId
        };

        this.isLoading = true;
        console.log(updatedFormation);
        this.formationService.update(this.selectedFormationId, updatedFormation).subscribe(
            res => {
                this.successMessage = 'Formateur assigné avec succès ✅';
                console.log('Formateur assigné:', res);
                this.isLoading = false;

                // Recharger les formations pour mettre à jour l'affichage
                this.loadFormations();
            },
            err => {
                console.error('Erreur assignation formateur:', err);
                this.errorMessage = 'Erreur lors de l\'assignation du formateur ❌';
                this.isLoading = false;
            }
        );
    }

    goToListeFormation(): void {
        this.router.navigate(['/liste-formation']);
    }
}
