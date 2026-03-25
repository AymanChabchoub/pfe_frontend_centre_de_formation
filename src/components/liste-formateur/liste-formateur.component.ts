import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-liste-formateur',
  templateUrl: './liste-formateur.component.html',
  styleUrls: ['./liste-formateur.component.css']
})
export class ListeFormateurComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['index', 'nom', 'email', 'cv'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  baseCvUrl: string = 'http://localhost:8080/';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.getFormateurs();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getFormateurs(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.dataSource.data = data.filter(u => u.role === 'FORMATEUR');
      console.log(this.dataSource.data);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPdfUrl(user: User): string {
    return this.baseCvUrl + user.cvPath;
  }
}
