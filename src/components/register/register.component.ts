import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ClientService } from '../../services/client/client.service';
import { FormateurService } from '../../services/formateur/formateur.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: any = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    role: '',
    adresse: '',
  };

  selectedCvFile: File | null = null;

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private formateurService: FormateurService
  ) {}

  onCvSelected(event: any) {
    this.selectedCvFile = event.target.files[0];
  }

  register() {
    // 1️⃣ D’abord créer un User
    this.authService.register(this.user).subscribe({
      next: (createdUser) => {
        console.log("User créé :", createdUser);

        // 2️⃣ Selon le rôle → créer Client ou Formateur
        if (this.user.role === 'CLIENT') {
          this.registerClient(createdUser.id);
        }
        else if (this.user.role === 'FORMATEUR') {
          this.registerFormateur(createdUser.id);
        }
      },
      error: err => {
        console.error("Erreur User :", err);
        alert("Erreur lors de l'inscription utilisateur.");
      }
    });
  }

  // -------------------------------
  //  CLIENT
  // -------------------------------
  registerClient(userId: number) {
    const client = {
      adresse: this.user.adresse,
      userId: userId
    };

    this.clientService.create(client).subscribe({
      next: res => {
        console.log("Client créé :", res);
        alert("Inscription client réussie !");
      },
      error: err => {
        console.error("Erreur Client", err);
        alert("Erreur lors de la création du client.");
      }
    });
  }

  // -------------------------------
  //  FORMATEUR
  // -------------------------------
  registerFormateur(userId: number) {

    if (!this.selectedCvFile) {
      alert("Veuillez sélectionner un fichier CV.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId.toString());
    formData.append("cvFile", this.selectedCvFile);

    this.formateurService.create(formData).subscribe({
      next: res => {
        console.log("Formateur créé :", res);
        alert("Inscription formateur réussie !");
      },
      error: err => {
        console.error("Erreur Formateur", err);
        alert("Erreur lors de la création du formateur.");
      }
    });
  }
}
