
export interface Post {

  id: number
  userId: number
  title: string
  content: string
  mediaType: string | null
  mediaURL: string | null
  created_at: string; 
  updated_at: string;
}


export interface NewPost {
  userId: number
  title: string
  content: string
  mediaType?: string | null 
  mediaURL?: string | null  
}