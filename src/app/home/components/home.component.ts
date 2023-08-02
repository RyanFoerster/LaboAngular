import {Component, OnInit} from '@angular/core';
import {Tournament} from "../../shared/models/Tournament";
import {TournamentService} from "../../shared/services/tournament.service";
import {Observable, tap} from "rxjs";
import {TournamentIndex} from "../../shared/models/TournamentIndex";
import {SessionService} from "../../services/session.service";
import {User} from "../../shared/models/User";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    tournamentsSub$?: Observable<TournamentIndex>
    tournaments?: Tournament[]
    isLoggedIn: boolean = false
    user!: User | undefined


    constructor(private _tournamentService: TournamentService,
                private _sessionService: SessionService) {
    }

    ngOnInit(): void {
        this.isLoggedIn = this.isUserLoggedIn()
        this.tournamentsSub$ = this._tournamentService.getTournaments().pipe(
            tap(data => this.tournaments = data.results)
        )
    }

    private isUserLoggedIn(): boolean{
        const token = this._sessionService.getToken()
        if(token){
            this.user = this._sessionService.getToken()?.user
        }
        return !!token
    }


}
