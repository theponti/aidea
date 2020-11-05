export interface Idea {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  user: string;
}

export interface IdeasState {
  ideas: Idea[];
  isLoading: boolean;
  error?: string | null;
}
