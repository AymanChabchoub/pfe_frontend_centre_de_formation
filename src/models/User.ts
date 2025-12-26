export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string; // RoleType.CLIENT, RoleType.FORMATEUR...
  cvPath:string;
  specialite:string;
}
