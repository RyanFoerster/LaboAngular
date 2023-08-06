import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../../shared/services/tournament.service";
import {TournamentDetails} from "../../../shared/models/TournamentDetails";
import {ActivatedRoute} from "@angular/router";
import {Observable, startWith, take, tap} from "rxjs";
import {Match} from "../../../shared/models/Match";
import {MenuItem} from "primeng/api";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-tournament-details',
    templateUrl: './tournament-details.component.html',
    styleUrls: ['./tournament-details.component.scss'],
    animations: [
        trigger('pageAnimation', [
            transition(':enter', [
                style({opacity: 0}),
                animate('500ms', style({opacity: 1})),
            ]),
            transition(':leave', [
                animate('500ms', style({opacity: 0})),
            ]),
        ]),
    ],
})
export class TournamentDetailsComponent implements OnInit {

    tournamentSub!: Observable<TournamentDetails>
    matches?: Match[];
    activeIndex: number = 0
    tournamentItems: MenuItem[] | undefined = []

    animationState: boolean = false;


    constructor(private _tournamentService: TournamentService,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.animationState = true
        let tournamentId = this._activatedRoute.snapshot.params['id']
        this.tournamentSub = this._tournamentService.getOneTournament(tournamentId).pipe(
            tap(data => {
                this.matches = data.matches
                if (this.matches) {
                    this.matches.forEach(match => {
                        this.tournamentItems?.push({
                            label: `Tour ${match.round}`
                        })
                    })
                }
                console.log(this.matches)
            })
        )
        console.log(this.matches)

    }

    onActiveIndexChange($event: number) {
        this.activeIndex = $event
    }
}
