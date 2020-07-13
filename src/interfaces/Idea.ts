
export interface Idea {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  user: string;
}

export interface IdeasState {
  ideas: Idea[] | void
  status?: string
  error?: string | void
}
