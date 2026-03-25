import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  sendResetCode(): void {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.loading = false;
        // Rediriger vers la page reset-password après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/reset-password'], { queryParams: { email: this.email } });
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erreur lors de l\'envoi du code';
        this.loading = false;
      }
    });
  }
}
