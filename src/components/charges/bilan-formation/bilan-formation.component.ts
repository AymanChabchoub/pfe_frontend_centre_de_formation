import { Component, OnInit } from '@angular/core';
import { ChargeService } from 'src/services/charge/charge.service';
import { FormationService } from 'src/services/formation/formation.service';

@Component({
  selector: 'app-bilan-formation',
  templateUrl: './bilan-formation.component.html',
  styleUrls: ['./bilan-formation.component.css']
})
export class BilanFormationComponent implements OnInit {

  formations: any[] = [];
  selectedFormationId: number | null = null;
  bilan: any = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private chargeService: ChargeService,
    private formationService: FormationService
  ) { }

  ngOnInit(): void {
    this.formationService.getAll().subscribe(res => {
      this.formations = res;
    });
  }

  chargerBilan(): void {
    if (!this.selectedFormationId) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.bilan = null;

    this.chargeService.getBilan(Number(this.selectedFormationId)).subscribe(
      res => {
        this.bilan = res;
        this.isLoading = false;
      },
      err => {
        console.error('Erreur chargement bilan', err);
        this.errorMessage = 'Erreur lors du chargement du bilan';
        this.isLoading = false;
      }
    );
  }
}
