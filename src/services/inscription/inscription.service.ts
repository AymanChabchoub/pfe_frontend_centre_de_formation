import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private baseUrl = 'http://localhost:8080/api/inscriptions';

  constructor(private http: HttpClient) {}

  // -------- CREATE --------
  create(inscription: any): Observable<any> {
    return this.http.post(this.baseUrl, inscription);
  }

  // -------- READ --------
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  getByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  getBySession(sessionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/session/${sessionId}`);
  }

  // -------- DELETE --------
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
