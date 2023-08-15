import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Match } from "../models/Match";
import { environments } from "../../../environments/environments";

@Injectable()
export class MatchService {

    constructor(private _httpClient: HttpClient) {
    }

    getMatch(params: {
        tournamentId: string,
        round?: number
    }): Observable<Match[]> {
        // Crée un objet HttpParams pour stocker les paramètres de requête
        let httpParams: HttpParams = new HttpParams();

        httpParams = httpParams.set("tournamentId", params.tournamentId);

        if (params.round) {
            httpParams = httpParams.set("round", params.round.toString()); // Ajoute le paramètre round s'il est fourni
        }

        return this._httpClient.get<Match[]>(`${environments.apiUrl}/Match`, { params: httpParams });
    }

    resultMatch(matchId: number, matchResult: string) {
        console.log(matchId);
        console.log(matchResult);

        const body = { result: matchResult }; // Crée un objet JSON avec la propriété "result"

        const headers = {
            'Content-Type': 'application/json'
        };

        return this._httpClient.patch(`${environments.apiUrl}/Match/${matchId}/result`, body, { headers });
    }
}
