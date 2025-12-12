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
    cvPath:'',
    specialite:''
  };

  selectedCvFile: File | null = null;

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private formateurService: FormateurService
  ) {}

  onCvSelected(event: any) {
    this.selectedCvFile = event.target.files[0];
    // Optionnel : stocker le nom du fichier ou un chemin temporaire
    this.user.cvPath = this.selectedCvFile?.name || '';
    console.log("CV sélectionné :", this.user.cvPath);
  }


    register() {
    console.log("this.user.spetialite",this.user.specialite)
    
    this.authService.register(this.user).subscribe({
      next: res => {
        alert("Inscription réussie !");
        const userId = res.id;

            if(this.user.role === 'FORMATEUR' && this.selectedCvFile) {

            this.authService.uploadCv(res.id, this.selectedCvFile).subscribe({
              next: () => alert("CV uploadé avec succès !"),
              error: err => console.error("Erreur CV :", err)
            });
          }
      },
      error: err => {
        console.error(err);
        alert("Erreur lors de l'inscription");
      }
    });
  }

}
