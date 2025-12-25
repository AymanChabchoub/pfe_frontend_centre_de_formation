import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { AuthService } from 'src/services/auth/auth.service';
import { FormationService } from 'src/services/formation/formation.service';
import { InscriptionService } from 'src/services/inscription/inscription.service';
import { PaiementService } from 'src/services/payment/payment.service';
import { SessionFormationService } from 'src/services/session_formation/sessionformation.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // 🔹 KPIs
  nbClient = 0;
  nbFormateur = 0;
  nbFormation = 0;
  nbInscription = 0;

  // 🔹 PIE : Répartition utilisateurs
  chartDataPie: ChartDataset<'pie'>[] = [{ data: [] }];
  chartLabelsPie: string[] = ['Clients', 'Formateurs'];
  chartOptionsPie: ChartOptions<'pie'> = { responsive: true };

  // 🔹 BAR : Formateurs actifs
  chartDataFormateurs: ChartDataset<'bar'>[] = [{ data: [], label: 'Sessions' }];
  chartLabelsFormateurs: string[] = [];
  chartOptionsFormateurs: ChartOptions<'bar'> = { responsive: true };

  // 🔹 BAR : Rentabilité formations
  chartDataRentabilite: ChartDataset<'bar'>[] = [{ data: [], label: 'Revenus (DT)' }];
  chartLabelsRentabilite: string[] = [];
  chartOptionsRentabilite: ChartOptions<'bar'> = { responsive: true };

  constructor(
    private userService: AuthService,
    private formationService: FormationService,
    private inscriptionService: InscriptionService,
    private sessionService: SessionFormationService,
    private paiementService: PaiementService
  ) {}

  ngOnInit(): void {
    this.loadKPIs();
    this.loadFormateursActifs();
    this.loadRentabilite();
  }

  // ================= KPIs + PIE =================
  loadKPIs(): void {
    this.userService.getAllUsers().subscribe(users => {
      users.forEach(u => {
        if (u.role === 'CLIENT') this.nbClient++;
        if (u.role === 'FORMATEUR') this.nbFormateur++;
      });
      this.chartDataPie[0].data = [this.nbClient, this.nbFormateur];
    });

    this.formationService.getAll().subscribe(f => this.nbFormation = f.length);
    this.inscriptionService.getAll().subscribe(i => this.nbInscription = i.length);
  }

  // ================= FORMATEURS ACTIFS =================
  loadFormateursActifs(): void {
    this.sessionService.getAll().subscribe(sessions => {
      const map: any = {};

      sessions.forEach(s => {
        map[s.formateurId] = (map[s.formateurId] || 0) + 1;
      });

      Object.keys(map).forEach(id => {
        this.userService.getUserById(+id).subscribe(user => {
          this.chartLabelsFormateurs.push(user.nom + ' ' + user.prenom);
          (this.chartDataFormateurs[0].data as number[]).push(map[id]);
        });
      });
    });
  }

  // ================= RENTABILITÉ =================
  loadRentabilite(): void {
    this.paiementService.getAll().subscribe(paiements => {
      const map: any = {};

      paiements.forEach(p => {
        map[p.formationId] = (map[p.formationId] || 0) + p.montant;
        console.log("Paiement formationId:", p.formationId, "Montant:", p.montant);
      });

      Object.keys(map).forEach(id => {
        this.formationService.getById(+id).subscribe(f => {
          this.chartLabelsRentabilite.push(f.titre);
          (this.chartDataRentabilite[0].data as number[]).push(map[id]);
        });
      });
    });
  }
}
