import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Match} from "../models/Match";
import {environments} from "../../../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    constructor(private _httpClient: HttpClient) {
    }

    getMatch(tournamentId: string): Observable<Match[]> {

        let params: HttpParams = new HttpParams()

        params = params.set("tournamentId", tournamentId)

        return this._httpClient.get<Match[]>(`${environments.apiUrl}/Match`, {params})
    }

}
