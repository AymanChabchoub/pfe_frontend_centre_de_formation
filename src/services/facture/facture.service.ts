import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private baseUrl = 'http://localhost:8080/api/factures';

  constructor(private http: HttpClient) {}

  // -------- CREATE --------
  create(facture: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, facture);
  }

  // -------- READ --------
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // -------- UPDATE --------
  update(id: number, facture: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, facture);
  }

  // -------- DELETE --------
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
