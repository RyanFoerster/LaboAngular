import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tournament} from "../models/Tournament";
import {environments} from "../../../environments/environments";
import {TournamentIndex} from "../models/TournamentIndex";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private _httpClient: HttpClient) { }

  getTournaments(): Observable<TournamentIndex>{
    return this._httpClient.get<TournamentIndex>(`${environments.apiUrl}/Tournament?Statuses=Closed`)
  }
}
