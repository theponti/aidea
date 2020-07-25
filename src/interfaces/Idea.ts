
export interface Idea {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  user: string;
}

export interface IdeasState {
  ideas: Idea[]
  status?: string
  error?: string | null
}
