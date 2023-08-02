import {UserGender} from "../enums/UserGender";

export interface User {
  id: string
  username: string
  email: string
  birthDate: Date
  elo: number
  gender: UserGender

}
