import { User } from "./User";

export interface Formateur extends User {
  prenom: string;
  telephone: string;
  specialite: string;
  cvPath: string;
}