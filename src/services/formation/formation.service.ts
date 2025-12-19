import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from 'src/models/Formation';


@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = 'http://localhost:8080/api/formations';

  constructor(private http: HttpClient) {}

  // 🔹 POST /api/formations
  ajouter(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(this.baseUrl, formation);
  }

  // 🔹 GET /api/formations
  getAll(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.baseUrl);
  }

  // 🔹 GET /api/formations/{id}
  getById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.baseUrl}/${id}`);
  }

  // 🔹 PUT /api/formations/{id}
  update(id: number, formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.baseUrl}/${id}`, formation);
  }

  // 🔹 DELETE /api/formations/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
