import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environments} from "../../../environments/environments";
import {TournamentIndex} from "../models/TournamentIndex";
import {TournamentDetails} from "../models/TournamentDetails";
import {TournamentAdd} from "../models/TournamentAdd";
import {User} from "../models/User";

@Injectable({
    providedIn: 'root'
})
export class TournamentService {

    constructor(private _httpClient: HttpClient) {
    }

    getTournaments(params: {
        offset?: number;
        name?: string;
        category?: string;
        status?: string[];
        womenOnly?: boolean;
    }): Observable<TournamentIndex> {
        let httpParams = new HttpParams();

        if (params.offset) {
            httpParams = httpParams.set('Offset', params.offset.toString());
        }
        if (params.name) {
            httpParams = httpParams.set('Name', params.name);
        }
        if (params.category) {
            httpParams = httpParams.set("Category", params.category)
        }
        if (params.status) {
            params.status.forEach(sta => {
                httpParams = httpParams.append('Statuses', sta);
            });
        }
        if (params.womenOnly) {
            httpParams = httpParams.set('WomenOnly', params.womenOnly);
        }

        return this._httpClient.get<TournamentIndex>(
            `${environments.apiUrl}/Tournament`,
            {params: httpParams}
        );
    }

    getOneTournament(id: string): Observable<TournamentDetails> {
        return this._httpClient.get<TournamentDetails>(`${environments.apiUrl}/Tournament/${id}`)
    }

    addTournament(tournamentToAdd: TournamentAdd) {
        return this._httpClient.post<TournamentAdd>(`${environments.apiUrl}/Tournament`, tournamentToAdd)
    }

    delete(tournamentId: string) {
        return this._httpClient.delete(`${environments.apiUrl}/Tournament/${tournamentId}`)
    }

    subscribeTournament(tournamentId: string, user: User | undefined) {
        return this._httpClient.post(`${environments.apiUrl}/TournamentInscription/${tournamentId}`, tournamentId)
    }

    unsubscribeTournament(tournamentId: string) {
        return this._httpClient.delete(`${environments.apiUrl}/TournamentInscription/${tournamentId}`)
    }

    start(tournamentId: string) {
        return this._httpClient.patch(`${environments.apiUrl}/Tournament/${tournamentId}/start`, tournamentId)
    }

    nextRound(tournamentId: string) {
        return this._httpClient.patch(`${environments.apiUrl}/Tournament/${tournamentId}/nextRound`, tournamentId)
    }
}
