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

  // -------- REGISTER --------
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // -------- LOGIN --------
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  // -------- LOGOUT --------
  logout(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, { token });
  }
  uploadCv(userId: number, cvFile: File) {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('cvFile', cvFile, cvFile.name);

    return this.http.post(`${this.baseUrl}/upload-cv`, formData, {
      responseType: 'text'
    });
  }


}
