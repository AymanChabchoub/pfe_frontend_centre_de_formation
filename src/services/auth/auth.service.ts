import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // -------- REGISTER --------
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // -------- LOGIN --------
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  // -------- LOGOUT --------

  uploadCv(userId: number, cvFile: File) {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('cvFile', cvFile, cvFile.name);

    return this.http.post(`${this.baseUrl}/upload-cv`, formData, {
      responseType: 'text'
    });
  }
  uploadImage(userId: number, imgFile: File) {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('imgFile', imgFile, imgFile.name);

    return this.http.post(`${this.baseUrl}/upload-img`, formData, {
      responseType: 'text'
    });
  }
  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;  // Si le token est absent, on considère qu'il est expiré.

    // Décoder le token (en supposant qu'il s'agit d'un JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;  // Convertir en millisecondes
    const currentTime = new Date().getTime();

    return currentTime >= expirationTime;  // Vérifier si le token est expiré
  }

  // Se déconnecter
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // 🔹 Récupérer les formateurs par spécialité
    getFormateursBySpecialite(specialite: string) : Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/formateurs/specialite/${specialite}`);
    }


}
