import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        // ✅ Sauvegarde dans localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('role', res.user.role);

        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          const userObj = JSON.parse(storedUser);
          console.log('User depuis localStorage :', userObj);
          console.log('Role :', userObj.role);
          console.log('Token :', localStorage.getItem('token'));
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Email ou mot de passe incorrect';
      }
    });
  }
}
