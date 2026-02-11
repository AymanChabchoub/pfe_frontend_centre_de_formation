import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionFormationService } from 'src/services/session_formation/sessionformation.service';
import { InscriptionService } from 'src/services/inscription/inscription.service';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-session-formation-list',
  templateUrl: './session-formation-list.component.html',
  styleUrls: ['./session-formation-list.component.css']
})
export class SessionFormationListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['index', 'titre', 'description', 'dateDebut', 'dateFin',
    'heureDebut', 'heureFin', 'salle', 'formateur',
    'inscriptionCount', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  formationId!: number;
  loading = false;
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sessionService: SessionFormationService,
    private inscriptionService: InscriptionService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    // Récupérer l'id de la formation depuis l'URL
    this.formationId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.formationId) {
      this.loadSessionsByFormation();
    } else {
      this.loadAllSessions();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // 🔹 Toutes les sessions
  loadAllSessions(): void {
    this.loading = true;
    this.sessionService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loadInscriptionCounts();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des sessions';
        this.loading = false;
      }
    });
  }

  // 🔹 Sessions par formation
  loadSessionsByFormation(): void {
    this.loading = true;
    this.sessionService.getByFormationId(this.formationId).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.loadInscriptionCounts();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Aucune session trouvée pour cette formation';
        this.loading = false;
      }
    });
  }

  // 🔹 Charger le nombre d'inscriptions pour chaque session
  loadInscriptionCounts(): void {
    if (this.dataSource.data.length === 0) return;

    const requests = this.dataSource.data.map(session =>
      this.inscriptionService.getBySession(session.id)
    );

    forkJoin(requests).subscribe({
      next: (results) => {
        results.forEach((inscriptions, index) => {
          this.dataSource.data[index].inscriptionCount = inscriptions.length;
        });
        // Trigger table update
        this.dataSource.data = [...this.dataSource.data];
      },
      error: () => {
        // En cas d'erreur, mettre 0 par défaut
        this.dataSource.data.forEach(session => session.inscriptionCount = 0);
        this.dataSource.data = [...this.dataSource.data];
      }
    });
  }

  // 🔹 Filtrage / Recherche
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToInscriptions(sessionId: number): void {
    this.router.navigate(['/liste-inscriptions-by-session-id', sessionId]);
  }

}
