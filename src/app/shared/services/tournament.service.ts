import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tournament} from "../models/Tournament";
import {environments} from "../../../environments/environments";
import {TournamentIndex} from "../models/TournamentIndex";
import {TournamentCategory} from "../enums/TournamentCategory";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private _httpClient: HttpClient) { }

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
            { params: httpParams }
        );
    }
}
