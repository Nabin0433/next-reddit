type Post = {
  body: string
  created_at: string
  id: number
  image: string
  subreddit_id: number
  title: string
  username: string
  vote: Vote[]
  comment: PostComment[]
  subreddit: Subreddit[]
}
type PostComment = {
  created_at: string
  id: number
  post_id: number
  text: string
  username: string
}

type Subreddit = {
  created_at: string
  id: number
  topic: string
}

type Vote = {
  created_at: string
  id: number
  post_id: number
  upvote: boolean
  username: string
}
