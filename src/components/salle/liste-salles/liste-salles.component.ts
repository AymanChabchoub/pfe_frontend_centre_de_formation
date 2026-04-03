import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalleService } from 'src/services/salle/salle.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-liste-salles',
  templateUrl: './liste-salles.component.html',
  styleUrls: ['./liste-salles.component.css']
})
export class ListeSallesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['index', 'nom', 'capacite', 'adresse', 'action'];
  dataSource = new MatTableDataSource<any>();
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salleService: SalleService, private router: Router) { }

  ngOnInit(): void {
    this.chargerSalles();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  chargerSalles(): void {
    this.isLoading = true;
    this.salleService.getAll().subscribe(
      data => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      err => {
        console.error('Erreur chargement salles', err);
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

  onUpdate(id: number): void {
    this.router.navigate(['/update-salle', id]);
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      this.salleService.delete(id).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(s => s.id !== id);
        },
        err => console.error('Erreur lors de la suppression', err)
      );
    }
  }

  goToCreate(): void {
    this.router.navigate(['/create-salle']);
  }
}
