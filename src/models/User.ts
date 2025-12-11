export interface User {
  id?: number;
  nom: string;
  email: string;
  password: string;
  role: string; // RoleType.CLIENT, RoleType.FORMATEUR...
}
