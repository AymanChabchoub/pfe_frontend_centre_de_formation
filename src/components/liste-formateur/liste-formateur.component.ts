import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { AuthService } from 'src/services/auth/auth.service';


@Component({
  selector: 'app-liste-formateur',
  templateUrl: './liste-formateur.component.html',
  styleUrls: ['./liste-formateur.component.css']
})
export class ListeFormateurComponent implements OnInit {
  users: User[] = [];
  baseCvUrl: string = 'http://localhost:8080/';        // Pour les CV

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.getFormateurs();
  }

  getFormateurs(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      // Filtrer les utilisateurs dont role = 'FORMATEUR' ou 1 selon ton backend
      this.users = data.filter(u => u.role === 'FORMATEUR');
      console.log(this.users);
    });
  }

  getPdfUrl(user: User): string {
    return this.baseCvUrl + user.cvPath; // Chemin complet vers le PDF
  }
}
