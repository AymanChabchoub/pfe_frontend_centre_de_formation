import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private salleService: SalleService
  ) {}

  ngOnInit(): void {
    this.salleForm = this.fb.group({
      nom: ['', Validators.required],
      capacite: [null, [Validators.required, Validators.min(1)]],
      adresse: ['', Validators.required] // Nouveau champ

    });
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
