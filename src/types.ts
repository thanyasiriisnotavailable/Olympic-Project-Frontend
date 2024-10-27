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

export interface MessageState {
  message: string
}

// Define the User type to use for user data in the auth store
export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  roles: string[]; // assuming roles is an array of strings
}
