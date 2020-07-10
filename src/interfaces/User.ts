
export interface FirebaseUser extends firebase.User {
  uid: string;
  displayName: string;
  email: string;
  photoUrl: string;
  votes: string[];
  ideas: string[];
}
