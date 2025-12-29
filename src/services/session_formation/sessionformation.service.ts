import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionFormationService {

  private baseUrl = 'http://localhost:8080/api/sessions'; 
  

  constructor(private http: HttpClient) {}

  // 🔹 Créer une session de formation
  create(session: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, session);
  }

  // 🔹 Récupérer toutes les sessions
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // 🔹 Récupérer une session par ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Mettre à jour une session
  update(id: number, session: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, session);
  }

  // 🔹 Supprimer une session
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // 🔹 Récupérer les sessions par ID de formation
  getByFormationId(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/formation/${formationId}`);
  }

}
