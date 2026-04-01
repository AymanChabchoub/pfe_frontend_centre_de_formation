import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  private baseUrl = 'http://localhost:8080/api/charges';

  constructor(private http: HttpClient) { }

  create(charge: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, charge);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  update(id: number, charge: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, charge);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getBySession(sessionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/session/${sessionId}`);
  }

  getBilan(formationId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/bilan/${formationId}`);
  }
}
