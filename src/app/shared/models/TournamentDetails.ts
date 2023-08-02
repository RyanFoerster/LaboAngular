import {TournamentCategory} from "../enums/TournamentCategory";
import {TournamentStatus} from "../enums/TournamentStatus";
import {User} from "./User";
import {Match} from "./Match";

export interface TournamentDetails {
  id: string,
  name?: string
  location?: string
  minPlayers: number
  maxPlayers: number
  eloMin?: number
  eloMax?: number
  categories: TournamentCategory[]
  womenOnly: boolean
  endOfRegistration: Date
  count: number
  canRegister: boolean
  isRegistered: boolean
  status: TournamentStatus
  currentRound: number
  players?: User[]
  canStart: boolean
  canValidateRound: boolean
  matches?: Match[]
}
