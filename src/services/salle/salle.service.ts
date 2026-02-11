import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  private baseUrl = 'http://localhost:8080/api/salles';

  constructor(private http: HttpClient) { }

  // -------- CREATE --------
  create(salle: any): Observable<any> {
    return this.http.post(this.baseUrl, salle);
  }

  // -------- READ --------
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // -------- DELETE --------
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
