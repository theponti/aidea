export interface User {
  id: string;
  username: string;
  displayName?: string;
  email: string;
  photoUrl?: string;
  votes?: string[];
  ideas?: string[];
}
