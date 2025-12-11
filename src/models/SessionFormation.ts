export interface SessionFormation {
  id?: number;
  titre: string;
  description: string;
  dateDebut: string;   // ISO string: "2025-01-15"
  dateFin: string;
  salle: string;
  formateurId?: number;
}