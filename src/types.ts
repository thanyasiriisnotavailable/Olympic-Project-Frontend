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
  gold: number
  silver: number
  bronze: number
}
