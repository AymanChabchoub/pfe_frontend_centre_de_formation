import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalleService } from 'src/services/salle/salle.service';

@Component({
  selector: 'app-create-salle',
  templateUrl: './create-salle.component.html',
  styleUrls: ['./create-salle.component.css']
})
export class CreateSalleComponent implements OnInit {
  salleForm!: FormGroup;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  isEditMode: boolean = false;
  salleId!: number;

  constructor(
    private fb: FormBuilder,
    private salleService: SalleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.salleForm = this.fb.group({
      nom: ['', Validators.required],
      capacite: [null, [Validators.required, Validators.min(1)]],
      adresse: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.salleId = +id;
        this.loadSalle(this.salleId);
      }
    });
  }

  loadSalle(id: number): void {
    this.isLoading = true;
    this.salleService.getById(id).subscribe(
      res => {
        this.salleForm.patchValue({
          nom: res.nom,
          capacite: res.capacite,
          adresse: res.adresse
        });
        this.isLoading = false;
      },
      err => {
        console.error('Erreur chargement salle', err);
        this.errorMessage = 'Impossible de charger les données de la salle.';
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.salleForm.invalid) {
      this.salleForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const salle = {
      nom: this.salleForm.value.nom,
      capacite: this.salleForm.value.capacite,
      adresse: this.salleForm.value.adresse
    };

    if (this.isEditMode) {
      this.salleService.update(this.salleId, salle).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Salle modifiée avec succès ✅';
          setTimeout(() => this.router.navigate(['/liste-salles']), 1500);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de la modification ❌';
          console.error(err);
        }
      });
    } else {
      this.salleService.create(salle).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Salle créée avec succès ✅';
          this.salleForm.reset();
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de la création de la salle ❌';
          console.error(err);
        }
      });
    }
  }
}
