import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChargeService } from 'src/services/charge/charge.service';
import { SessionFormationService } from 'src/services/session_formation/sessionformation.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.css']
})
export class ChargeListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['index', 'session', 'type', 'description', 'montant', 'date', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  isLoading = false;

  sessions: any[] = [];
  filterSessionId: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private chargeService: ChargeService,
    private sessionService: SessionFormationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSessions();
    this.loadCharges();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSessions(): void {
    this.sessionService.getAll().subscribe(res => {
      this.sessions = res;
    });
  }

  loadCharges(): void {
    this.isLoading = true;
    this.chargeService.getAll().subscribe(
      res => {
        this.dataSource.data = res;
        this.isLoading = false;
      },
      err => {
        console.error('Erreur chargement charges', err);
        this.isLoading = false;
      }
    );
  }

  filtrerParSession(): void {
    if (this.filterSessionId) {
      this.isLoading = true;
      this.chargeService.getBySession(this.filterSessionId).subscribe(
        res => {
          this.dataSource.data = res;
          this.isLoading = false;
        },
        err => {
          console.error('Erreur filtrage', err);
          this.isLoading = false;
        }
      );
    } else {
      this.loadCharges();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCharge(id: number): void {
    if (!confirm('Voulez-vous supprimer cette charge ?')) return;
    this.chargeService.delete(id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(c => c.id !== id);
      },
      err => console.error('Erreur suppression', err)
    );
  }

  goToChargeForm(): void {
    this.router.navigate(['/charge-form']);
  }

  goToBilan(): void {
    this.router.navigate(['/bilan-financier']);
  }
}
