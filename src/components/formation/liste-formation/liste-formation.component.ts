import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { FormationService } from 'src/services/formation/formation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-liste-formation',
  templateUrl: './liste-formation.component.html',
  styleUrls: ['./liste-formation.component.css']
})
export class ListeFormationComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['index', 'titre', 'description', 'dureeHeures', 'prix', 'formateur', 'sessions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formationService: FormationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFormations();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFormations(): void {
    this.isLoading = true;

    this.formationService.getAll().subscribe(
      res => {
        this.dataSource.data = res;

        // Pour chaque formation, charger le formateur
        this.dataSource.data.forEach(f => {
          if (f.formateurId) {
            this.authService.getUserById(f.formateurId).subscribe(
              user => {
                f.formateurNom = user.nom + ' ' + user.prenom;
              },
              () => {
                f.formateurNom = 'Inconnu';
              }
            );
          } else {
            f.formateurNom = '—';
          }
        });

        this.isLoading = false;
      },
      err => {
        console.error('Erreur chargement formations', err);
        this.isLoading = false;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteFormation(id: number): void {
    if (!confirm('Voulez-vous supprimer cette formation ?')) {
      return;
    }

    this.formationService.delete(id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(f => f.id !== id);
      },
      err => {
        console.error('Erreur suppression formation', err);
      }
    );
  }

  goToSessions(formationId: number): void {
    this.router.navigate(['/sessions', formationId]);
  }

  goToAssignFormateur(): void {
    this.router.navigate(['/assign-formateur']);
  }
}