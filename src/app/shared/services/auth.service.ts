import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environments } from "../../../environments/environments";
import { Observable, tap } from "rxjs";
import { Token } from "../models/Token";

@Injectable()
export class AuthService {

    private _token: string | undefined = ""; // Variable privée pour stocker le token

    constructor(private _httpClient: HttpClient) {
    }

    login(username: string, password: string): Observable<Token> {
        // Appel à l'API pour effectuer la connexion
        return this._httpClient.post<Token>(`${environments.apiUrl}/login`, {
            username,
            password
        }).pipe(
            tap(response => this._token = response.token) // Stockage du token dans la variable privée
        );
    }

    get token() {
        return this._token; // Renvoie le token actuel
    }
}
