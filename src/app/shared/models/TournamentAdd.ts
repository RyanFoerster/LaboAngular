import {TournamentCategory} from "../enums/TournamentCategory";

export interface TournamentAdd {
  name: string
  location?: string
  minPlayers: number
  maxPlayers: number
  eloMin?: number
  eloMax?: number
  categories: TournamentCategory[]
  womenOnly: boolean
  endOfRegistrationDate: Date
}
