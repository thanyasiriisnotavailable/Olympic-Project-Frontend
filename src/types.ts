export interface Country {
  order: number
  id: string
  name: string
  gold: number
  silver: number
  bronze: number
  flag: string
  capital: string
  language: string
  sports: Sport[]
}

export interface Sport {
  sport: string
  medals: Medals
}

export interface Medals {
  gold: number
  silver: number
  bronze: number
}

export interface CommentState {
  comment: string
}
