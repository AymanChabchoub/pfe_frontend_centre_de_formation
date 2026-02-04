export interface SessionFormation {
  id?: number;
  titre: string;
  description: string;
  dateDebut: string;   // ISO string: "2025-01-15"
  dateFin: string;
  heureDebut?: string; // Format: "HH:mm"
  heureFin?: string;   // Format: "HH:mm"
  salle: string;
  formateurId?: number;
}
