export interface Country {
  orderNo: number
  id: string
  name: string
  flag: string
  capital: string
  language: string
  continent: string
  sports: Sport[]
  comments: String[]
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
