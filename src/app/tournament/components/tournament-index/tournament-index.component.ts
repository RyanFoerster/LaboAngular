import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../../shared/services/tournament.service";
import {delay, first, Observable, of, tap} from "rxjs";
import {TournamentStatus} from "../../../shared/enums/TournamentStatus";
import {TournamentIndex} from "../../../shared/models/TournamentIndex";
import {TournamentCategory} from "../../../shared/enums/TournamentCategory";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionService} from "../../../shared/services/session.service";
import {User} from "../../../shared/models/User";
import {animate, style, transition, trigger} from "@angular/animations";
import {Router, RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {SharedModule} from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {AsyncPipe, DatePipe, NgClass, NgIf} from '@angular/common';
import {PaginatorModule, PaginatorState} from "primeng/paginator";


@Component({
    selector: 'app-tournament-index',
    templateUrl: './tournament-index.component.html',
    styleUrls: ['./tournament-index.component.scss'],
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
        ButtonModule,
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        MultiSelectModule,
        InputSwitchModule,
        ProgressSpinnerModule,
        TableModule,
        SharedModule,
        NgClass,
        DatePipe,
        AsyncPipe,
        PaginatorModule
    ],
})
export class TournamentIndexComponent implements OnInit {

    tournamentsSub$?: Observable<TournamentIndex>
    tournamentCategories = this.enumToDropdownOptions(TournamentCategory);
    tournamentStatus = this.enumToDropdownOptions(TournamentStatus)
    showSpinner: boolean = false

    searchForm: FormGroup
    showSearchForm!: boolean;

    animationState: boolean = false;

    user?: User

    totalRecords: number = 10

    first: number = 0
    rows: number = 10


    constructor(private _tournamentService: TournamentService,
                private _formBuilder: FormBuilder,
                private _sessionService: SessionService,
                private _router: Router) {

        this.searchForm = this._formBuilder.group({
            name: [null],
            category: [null],
            status: [null],
            womenOnly: [null]
        })

    }

    ngOnInit() {

        this.animationState = true

        if (this._sessionService.getToken()) {
            this.user = this._sessionService.getToken()?.user
        }

        this.tournamentsSub$ = this._tournamentService.getTournaments({
            offset: 0,
            name: undefined,
            category: undefined,
            status: [TournamentStatus.C, TournamentStatus.I, TournamentStatus.W],
            womenOnly: false
        }).pipe(
            tap(data => {
                this.totalRecords = data.total
            })
        )

    }

    private enumToDropdownOptions(myEnum: any): any[] {
        return Object.keys(myEnum).map((key) => ({name: myEnum[key], value: key}));
    }

    onSearch() {
        let name = this.searchForm.get('name')?.value
        let category = this.searchForm.get('category')?.value === null ? null : this.searchForm.get('category')?.value.name
        let status = this.searchForm.get('status')?.value
        let selectedStatus: string[] = []
        let womenOnly = this.searchForm.get('womenOnly')?.value

        if (status) {
            Object.keys(status).forEach(key => {
                selectedStatus.push(status[key].name);
            });
        }

        this.tournamentsSub$ = this._tournamentService.getTournaments({
            offset: undefined,
            name,
            category,
            status: selectedStatus,
            womenOnly
        }).pipe(
            tap(() => this.showSpinner = true),
            delay(1000),
            tap(() => this.showSpinner = false)
        )
    }

    onReset() {
        this.searchForm.reset();
        this.refreshTournaments()
    }

    toggleShowForm() {
        this.showSearchForm = !this.showSearchForm
    }

    deleteTournament(tournamentId: string) {
        this._tournamentService.delete(tournamentId).subscribe(() => {
            this.refreshTournaments();
            this._router.navigateByUrl("/tournament/index");
        });
    }

    subscribe(tournamentId: string) {
        this._tournamentService.subscribeTournament(tournamentId).subscribe(() => {
            this.refreshTournaments();
            this._router.navigateByUrl("/tournament/index");
        });
    }

    unsubscribe(tournamentId: string) {
        this._tournamentService.unsubscribeTournament(tournamentId).subscribe(() => {
            this.refreshTournaments();
        });
    }

    private refreshTournaments(offset?: number) {
        this.showSpinner = true;
        this.tournamentsSub$ = this._tournamentService.getTournaments({
            offset,
            name: undefined,
            category: undefined,
            status: [TournamentStatus.C, TournamentStatus.I, TournamentStatus.W],
            womenOnly: undefined
        }).pipe(
            delay(1000),
            tap(() => this.showSpinner = false)
        );
    }

    onPagesChange($event: PaginatorState) {
        const offset = $event.first
        //@ts-ignore
        this.first = offset
        //@ts-ignore
        this.rows = $event.rows


        this.tournamentsSub$ = this._tournamentService.getTournaments({
            offset,
            name: undefined,
            category: undefined,
            status: [TournamentStatus.C, TournamentStatus.I, TournamentStatus.W],
            womenOnly: undefined
        }).pipe(
            tap(() => this.showSpinner = true),
            delay(1000),
            tap(() => this.showSpinner = false)
        )
    }
}
