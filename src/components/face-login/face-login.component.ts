import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-face-login',
  templateUrl: './face-login.component.html',
  styleUrls: ['./face-login.component.css']
})
export class FaceLoginComponent {

  selectedFile: File | null = null;
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  faceLogin() {
  if (!this.selectedFile) {
    this.errorMessage = 'Veuillez sélectionner une image';
    return;
  }

  this.loading = true;
  this.errorMessage = '';

  this.authService.faceLogin(this.selectedFile).subscribe({
    next: (response) => {
      console.log('Utilisateur reconnu :', response);

      // 🔐 Stockage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      this.loading = false;

      alert(
        'Reconnaissance réussie : ' +
        response.user.nom + ' ' +
        response.user.prenom
      );
    },
    error: (err) => {
      this.loading = false;
      this.errorMessage = err.error?.error || 'Visage non reconnu';
    }
  });
}

}
