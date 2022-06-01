export type User = {
  id: string
  name: string
  image: string
}

export type Reply = {
  user: User
  updatedAt: Date
  id: string
  text: string
}

export type Comment = {
  user: User
  updatedAt: Date
  id: string
  text: string
  replies: Reply[]
}