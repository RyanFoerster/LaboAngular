import {UserGender} from "../enums/UserGender";

export interface MemberForm {
  username: string
  email: string
  birthDate: Date
  elo?: number
  gender: UserGender
}
