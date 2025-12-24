import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private baseUrl = 'http://localhost:8080/api/paiements';

  constructor(private http: HttpClient) {}

  // -------- CREATE --------
  create(paiement: any): Observable<any> {
    return this.http.post(this.baseUrl, paiement);
  }

  // -------- READ --------
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getByFacture(factureId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/facture/${factureId}`);
  }

  // -------- DELETE --------
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
