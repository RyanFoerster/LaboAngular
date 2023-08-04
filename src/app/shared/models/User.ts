import {UserGender} from "../enums/UserGender";
import {UserRole} from "../enums/UserRole";

export interface User {
    id: string
    username: string
    email: string
    birthDate: Date
    elo: number
    gender: UserGender
    role: UserRole
}
