
export interface Idea {
  _id: string;
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  user: string;
}

export interface IdeasState {
  ideas: Idea[]
  status?: string
}
