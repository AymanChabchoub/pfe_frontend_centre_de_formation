import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = 'http://localhost:8080/api/formations';

  constructor(private http: HttpClient) { }

  // 🔹 POST /api/formations
  ajouter(formation: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, formation);
  }

  // 🔹 GET /api/formations
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // 🔹 GET /api/formations/{id}
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // 🔹 PUT /api/formations/{id}
  update(id: number, formation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, formation);
  }

  // 🔹 DELETE /api/formations/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // 🔹 GET /api/formations/formateur/{formateurId}
  getByFormateurId(formateurId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/formateur/${formateurId}`);
  }

}
