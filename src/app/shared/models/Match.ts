import {MatchResult} from "../enums/MatchResult";

export interface Match{
  id: number
  tournamentId: string
  blackName?: string
  blackId: string
  whiteName?: string
  whiteId: string
  result: MatchResult
  round: number
}
