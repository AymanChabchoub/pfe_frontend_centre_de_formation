import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formateur } from '../../models/Formateur'; // crée un model Formateur correspondant à ton backend



@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  private apiUrl = 'http://localhost:8080/api/formateurs';

  constructor(private http: HttpClient) { }

  // Créer un formateur
  create(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }


  // Récupérer tous les formateurs
  getAll(): Observable<Formateur[]> {
    return this.http.get<Formateur[]>(this.apiUrl);
  }

  // Récupérer un formateur par ID
  getById(id: number): Observable<Formateur> {
    return this.http.get<Formateur>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un formateur
  update(id: number, formateur: Formateur): Observable<Formateur> {
    return this.http.put<Formateur>(`${this.apiUrl}/${id}`, formateur);
  }

  // Supprimer un formateur
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
