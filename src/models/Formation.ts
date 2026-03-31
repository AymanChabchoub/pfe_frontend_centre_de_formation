export interface Formation {
  id?: number;
  titre: string;
  description: string;
  dureeHeures: number;
  prix: number;
  formateurId?: number;
  tauxRemise?: number;
  dateExpirationRemise?: string;
}