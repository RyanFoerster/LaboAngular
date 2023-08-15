import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../../shared/services/tournament.service";
import {TournamentDetails} from "../../../shared/models/TournamentDetails";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {delay, Observable, tap} from "rxjs";
import {Match} from "../../../shared/models/Match";
import {MenuItem, SharedModule} from "primeng/api";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatchService} from "../../../shared/services/match.service";
import {MatchResult} from "../../../shared/enums/MatchResult";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../shared/models/User";
import {SessionService} from "../../../shared/services/session.service";
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {AsyncPipe, NgIf} from '@angular/common';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-tournament-details',
    templateUrl: './tournament-details.component.html',
    styleUrls: ['./tournament-details.component.scss'],
    animations: [
        trigger('pageAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('500ms', style({ opacity: 0 })),
            ]),
        ]),
    ],
    standalone: true,
    imports: [
        NgIf,
        ProgressSpinnerModule,
        CardModule,
        StepsModule,
        PanelModule,
        SharedModule,
        TableModule,
        ButtonModule,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        AsyncPipe,
    ],
})
export class TournamentDetailsComponent implements OnInit {

    tournamentSub!: Observable<TournamentDetails>  // Observable pour récupérer les détails d'un tournoi
    matches?: Match[];   // Tableau de matchs
    activeIndex: number = 0 // Index actif
    tournamentItems: MenuItem[] | undefined = [] // Éléments du menu du tournoi
    match!: Match  // Match actuel
    currentRound: number = 1 // Ronde actuelle
    animationState: boolean = false; // État de l'animation
    matchResults: string[] = Object.values(MatchResult) // Résultats possibles d'un match
    user!: User | undefined; // Utilisateur connecté

    resultForm: FormGroup // Formulaire pour le résultat d'un match

    showSpinner: boolean = false // Afficher ou non le spinner de chargement

    playerStats: { [playerId: string]: { wins: number; losses: number; draws: number } } = {} // Statistiques des joueurs

    constructor(private _tournamentService: TournamentService,
                private _activatedRoute: ActivatedRoute,
                private _matchService: MatchService,
                private _formBuilder: FormBuilder,
                private _sessionService: SessionService,
                private _title: Title) {

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
                this.initTitle(data)
                this.calculatePlayerStats()

                if (this.matches && this.tournamentItems?.length === 0) {

                    this.matches.forEach(match => {
                        this.tournamentItems?.push({
                            label: `Tour ${match.round}`
                        })

                    })
                }

            })
        )
    }

    initTitle(tournament: TournamentDetails | undefined){
        if(!tournament){
            this._title.setTitle('Tournament not found')
            return
        }

        if (tournament.name != null) {
            this._title.setTitle(tournament.name)
        }
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
                    } else if (match.result === 'Draw'){
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
                    } else  if (match.result === 'Draw') {
                        this.playerStats[match.blackId].draws++;
                    }
                }
            }
        }

    }

    onActiveIndexChange($event: number, tournament: TournamentDetails) {
        this.activeIndex = $event

        if(tournament.currentRound === 2){
            this.currentRound = $event + 1
        }

        this.showSpinner = true
        this._matchService.getMatch({tournamentId:tournament.id, round:this.activeIndex+1}).subscribe(data => {
            this.match = data[0]
            this.showSpinner = false
        })
        this.calculatePlayerStats();
    }

    start(tournamentId: string) {
        this._tournamentService.start(tournamentId).pipe(
            tap(() => {
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

    calculateTotalScore(playerId: string): number { // Calcule le score total d'un joueur
        const stats = this.playerStats[playerId]; // Récupère les statistiques du joueur
        if (!stats) { // Si les statistiques sont indisponibles, retourne 0
            return 0;
        }

        const wins = stats.wins; // Nombre de victoires
        const losses = stats.losses; // Nombre de défaites
        const draws = stats.draws; // Nombre de matchs nuls

        let totalScore = wins - losses + (draws * 0.5); // Calcul du score total (victoires - défaites + matchs nuls * 0.5)

        totalScore = Math.max(totalScore, 0); // Le score total ne peut pas être négatif

        if (totalScore === 0 && draws > 0) { // Si le score total est 0 mais qu'il y a des matchs nuls, retourne 0.5
            return 0.5;
        }

        return totalScore; // Retourne le score total
    }

    resultFormSubmit(matchId: number) {
        this.resultForm.get('result')?.markAsDirty(); // Mark the control as dirty to trigger ngSubmit
        this.resultForm.get('result')?.updateValueAndValidity(); // Update the control's validity
        let result = this.resultForm.get('result')?.value
        this._matchService.resultMatch(matchId, result).pipe(
            tap(() => {
                if(this.currentRound < 2){
                    let tournamentId = this._activatedRoute.snapshot.params['id']
                    this._matchService.getMatch({
                        tournamentId,
                        round: this.currentRound
                    }).subscribe(data => {
                        this.match = data[0]
                    })
                }
            })
        ).subscribe()

    }

    nextRound(tournamentId: string) {
        this._tournamentService.nextRound(tournamentId).pipe(
            tap(data => {
                if(this.currentRound < 2){
                    this.currentRound++
                    this.activeIndex++
                }

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
