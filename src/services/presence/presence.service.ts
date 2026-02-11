import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  private baseUrl = 'http://localhost:8080/api/presences';

  constructor(private http: HttpClient) { }

  // 🔹 Créer une présence
  create(presence: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, presence);
  }

  // 🔹 Récupérer toutes les présences
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // 🔹 Récupérer par ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Mettre à jour
  update(id: number, presence: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, presence);
  }

  // 🔹 Supprimer
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // 👉 utilisé par QR et bouton
  pointage(inscriptionId: number) {
    return this.http.post(
      `http://localhost:8080/api/presences/pointage/${inscriptionId}`,
      {},
      { responseType: 'text' }
    );
  }


  generateQr(inscriptionId: number) {
    return this.http.get(
      `${this.baseUrl}/qr/${inscriptionId}`,
      { responseType: 'blob' }
    );
  }

}
