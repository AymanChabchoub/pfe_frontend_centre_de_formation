import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { FormationService } from 'src/services/formation/formation.service';
import { SalleService } from 'src/services/salle/salle.service';
import { SessionFormationService } from 'src/services/session_formation/sessionformation.service';

@Component({
  selector: 'app-create-session-formation',
  templateUrl: './create-session-formation.component.html',
  styleUrls: ['./create-session-formation.component.css']
})
export class CreateSessionFormationComponent {
  // Champs session
  titre: string = '';
  description: string = '';
  dateDebut!: string;
  dateFin!: string;

  formateurId!: number;
  formationId!: number;
  salleId!: number;

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // Listes déroulantes
  formateurs: any[] = [];
  formations: any[] = [];
  salles: any[] = [];

  constructor(
    private authService: AuthService,
    private formationService: FormationService,
    private sessionService: SessionFormationService,
    private salleService: SalleService
  ) {}

  ngOnInit(): void {
    this.loadFormateurs();
    this.loadFormations();
    this.loadSalles();
  }

  // 🔹 Formateurs
  loadFormateurs(): void {
    this.authService.getAllUsers().subscribe(res => {
      this.formateurs = res.filter((u: any) => u.role === 'FORMATEUR');
    });
  }

  // 🔹 Formations
  loadFormations(): void {
    this.formationService.getAll().subscribe(res => {
      this.formations = res;
    });
  }

  // 🔹 Salles (statique pour l’instant)
  loadSalles(): void {
    this.salleService.getAll().subscribe(res => {
      this.salles = res;
    });
  }

  onSubmit(): void {
    if (!this.titre || !this.description || !this.dateDebut || !this.dateFin ||
        !this.formateurId || !this.formationId || !this.salleId) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    const session = {
      titre: this.titre,
      description: this.description,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      formateurId: this.formateurId,
      formationId: this.formationId,
      salleId: this.salleId,
      salle: this.salles.find(s => s.id === this.salleId)?.nom
    };

    this.isLoading = true;
    this.sessionService.create(session).subscribe(
      res => {
        this.successMessage = 'Session créée avec succès';
        this.errorMessage = '';
        this.isLoading = false;
        this.resetForm();
      },
      err => {
        this.errorMessage = 'Erreur lors de la création';
        this.successMessage = '';
        this.isLoading = false;
      }
    );
  }

  resetForm(): void {
    this.titre = '';
    this.description = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.formateurId = 0;
    this.formationId = 0;
    this.salleId = 0;
  }


}
