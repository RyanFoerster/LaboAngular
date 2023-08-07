import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../../shared/services/tournament.service";
import {TournamentDetails} from "../../../shared/models/TournamentDetails";
import {ActivatedRoute} from "@angular/router";
import {delay, Observable, startWith, take, tap} from "rxjs";
import {Match} from "../../../shared/models/Match";
import {MenuItem} from "primeng/api";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatchService} from "../../../shared/services/match.service";
import {MatchResult} from "../../../shared/enums/MatchResult";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../shared/models/User";
import {SessionService} from "../../../shared/services/session.service";

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
    match!: Match
    currentRound: number = 1
    animationState: boolean = false;
    matchResults: string[] = Object.values(MatchResult)
    user!: User | undefined

    resultForm: FormGroup

    showSpinner: boolean = false

    playerStats: { [playerId: string]: { wins: number; losses: number; draws: number } } = {}

    constructor(private _tournamentService: TournamentService,
                private _activatedRoute: ActivatedRoute,
                private _matchService: MatchService,
                private _formBuilder: FormBuilder,
                private _sessionService: SessionService) {

        this.resultForm = this._formBuilder.group({
            result: [null]
        })

        if(this._sessionService.getToken()){
            this.user = this._sessionService.getToken()?.user
        }
    }

    ngOnInit() {
        this.animationState = true
        let tournamentId = this._activatedRoute.snapshot.params['id']

        this._matchService.getMatch({
            tournamentId,
            round: this.currentRound
        }).subscribe(data => {
            this.match = data[0]

        })

        this.tournamentSub = this._tournamentService.getOneTournament(tournamentId).pipe(
            tap(data => {
                this.matches = data.matches
                this.calculatePlayerStats()

                if (this.matches) {

                    this.matches.forEach(match => {
                        this.tournamentItems?.push({
                            label: `Tour ${match.round}`
                        })

                    })
                }

            })
        )
    }

    calculatePlayerPositions(round: number): { playerId: string; position: number }[] {
        const playerPositions: { playerId: string; position: number }[] = [];

        const playerScores: { [playerId: string]: number } = {};

        // Calculez les scores totaux pour tous les joueurs
        for (const playerId in this.playerStats) {
            playerScores[playerId] = this.calculateTotalScore(playerId);
        }

        // Triez les joueurs par score total
        const sortedPlayers = Object.keys(playerScores).sort((a, b) => playerScores[b] - playerScores[a]);

        // Associez les positions aux joueurs
        let position = 1;
        for (const playerId of sortedPlayers) {
            playerPositions.push({ playerId, position });
            position++;
        }

        return playerPositions;
    }

    getPlayerPosition(playerId: string, round: number): number {
        const playerPositions = this.calculatePlayerPositions(round);
        const playerPosition = playerPositions.find(position => position.playerId === playerId);
        return playerPosition ? playerPosition.position : 0;
    }

    calculatePlayerStats() {
        this.playerStats = {};

        if(this.matches){
            for (const match of this.matches) {
                if (match.round <= this.currentRound) {
                    // Mise à jour des statistiques pour le joueur blanc
                    if (!this.playerStats[match.whiteId]) {
                        this.playerStats[match.whiteId] = { wins: 0, losses: 0, draws: 0 };
                    }
                    if (match.result === 'WhiteWin') {
                        this.playerStats[match.whiteId].wins++;
                    } else if (match.result === 'BlackWin') {
                        this.playerStats[match.whiteId].losses++;
                    } else {
                        this.playerStats[match.whiteId].draws++;
                    }

                    // Mise à jour des statistiques pour le joueur noir
                    if (!this.playerStats[match.blackId]) {
                        this.playerStats[match.blackId] = { wins: 0, losses: 0, draws: 0 };
                    }
                    if (match.result === 'BlackWin') {
                        this.playerStats[match.blackId].wins++;
                    } else if (match.result === 'WhiteWin') {
                        this.playerStats[match.blackId].losses++;
                    } else {
                        this.playerStats[match.blackId].draws++;
                    }
                }
            }
        }

    }

    onActiveIndexChange($event: number) {
        this.activeIndex = $event

        this.currentRound = $event + 1

        this.calculatePlayerStats();
    }

    start(tournamentId: string) {
        this._tournamentService.start(tournamentId).subscribe()
    }

    calculateTotalScore(playerId: string): number {
        const stats = this.playerStats[playerId];
        if (!stats) {
            return 0;
        }

        const wins = stats.wins;
        const losses = stats.losses;
        const draws = stats.draws;

        let totalScore = wins - losses + (draws * 0.5);

        totalScore = Math.max(totalScore, 0);

        if (totalScore === 0 && draws > 0) {
            return 0.5;
        }

        return totalScore;
    }

    resultFormSubmit(matchId: number) {
        this.resultForm.get('result')?.markAsDirty(); // Mark the control as dirty to trigger ngSubmit
        this.resultForm.get('result')?.updateValueAndValidity(); // Update the control's validity
        let result = this.resultForm.get('result')?.value
        this._matchService.resultMatch(matchId, result).pipe(
            tap(() => {
                let tournamentId = this._activatedRoute.snapshot.params['id']
                this.showSpinner = true
                this._matchService.getMatch({
                    tournamentId,
                    round: this.currentRound
                }).subscribe(data => {
                    this.match = data[0]
                })
            }),
            delay(1000),
            tap(() => this.showSpinner = false)
        ).subscribe()

    }

    nextRound(tournamentId: string) {
        this._tournamentService.nextRound(tournamentId).pipe(
            tap(data => {
                console.log(data)
                this.currentRound++
                this.showSpinner = true
                this._matchService.getMatch({
                    tournamentId,
                    round: this.currentRound
                }).subscribe(data => {
                    this.match = data[0]
                })
            }),
            delay(1000),
            tap(() => this.showSpinner = false)
        ).subscribe()
    }
}
