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
  heureDebut!: string;
  heureFin!: string;

  selectedSpecialite: string = '';
  formateurId!: number;
  formationId!: number;
  salleId!: number;

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // Listes déroulantes
  specialites: string[] = [];
  formateurs: any[] = [];
  formations: any[] = [];
  salles: any[] = [];

  constructor(
    private authService: AuthService,
    private formationService: FormationService,
    private sessionService: SessionFormationService,
    private salleService: SalleService
  ) { }

  ngOnInit(): void {
    this.loadSpecialites();
    this.loadSalles();
  }

  // 🔹 Charger toutes les spécialités (unique)
  loadSpecialites(): void {
    this.authService.getAllUsers().subscribe(res => {
      const formateurs = res.filter((u: any) => u.role === 'FORMATEUR' && u.specialite);
      this.specialites = Array.from(new Set(formateurs.map(f => f.specialite)));
    });
  }

  // 🔹 Charger les formateurs selon la spécialité sélectionnée
  onSpecialiteChange(): void {
    if (!this.selectedSpecialite) {
      this.formateurs = [];
      this.formateurId = 0;
      this.formations = [];
      this.formationId = 0;
      return;
    }

    this.authService.getFormateursBySpecialite(this.selectedSpecialite).subscribe(res => {
      this.formateurs = res;
      this.formateurId = 0;
      this.formations = [];
      this.formationId = 0;
    });
  }

  // 🔹 Charger les formations selon le formateur sélectionné
  onFormateurChange(): void {
    if (!this.formateurId) {
      this.formations = [];
      this.formationId = 0;
      return;
    }

    this.formationService.getByFormateurId(this.formateurId).subscribe(res => {
      this.formations = res;
      this.formationId = 0;
    });
  }

  // 🔹 Salles
  loadSalles(): void {
    this.salleService.getAll().subscribe(res => {
      this.salles = res;
      console.log("Salles chargées:", this.salles);
    });
  }

  onSubmit(): void {
    if (!this.titre || !this.description || !this.dateDebut || !this.dateFin ||
      !this.heureDebut || !this.heureFin ||
      !this.selectedSpecialite || !this.formateurId || !this.formationId || !this.salleId) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    const session = {
      titre: this.titre,
      description: this.description,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      heureDebut: this.heureDebut,
      heureFin: this.heureFin,
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
    this.heureDebut = '';
    this.heureFin = '';
    this.selectedSpecialite = '';
    this.formateurId = 0;
    this.formationId = 0;
    this.salleId = 0;
    this.formateurs = [];
    this.formations = [];
  }
}
