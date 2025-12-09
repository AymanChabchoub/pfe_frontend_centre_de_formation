import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../models/Client'; // crée un model Formateur correspondant à ton backend

@Injectable({
  providedIn: 'root'
})
export class ClientService {

private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  // Créer un client
  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  // Récupérer tous les clients
  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Récupérer un client par ID
  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un client
  update(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  // Supprimer un client
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
