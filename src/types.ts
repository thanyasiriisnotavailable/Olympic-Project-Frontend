export interface Country {
  id: number
  name: string
  gold: number
  silver: number
  bronze: number
  flag: string
  details: CountryDetails
  sports: Sport[]
  comments: Comment[] // List of comments
}

// details about a country
export interface CountryDetails {
  capital: string
  language: string
  region: string
  continent: string
}

export interface Sport {
  sport: string
  medals: Medal
}

// the type of medal and the count of medals won in that sport
export interface Medal {
  gold: number
  silver: number
  bronze: number
}

// a comment made by a user
export interface Comment {
  user: string
  text: string
  timestamp: Date
}
