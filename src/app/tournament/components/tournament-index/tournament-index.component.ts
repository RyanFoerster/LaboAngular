import {Component, OnInit} from '@angular/core';
import {Tournament} from "../../../shared/models/Tournament";
import {TournamentService} from "../../../shared/services/tournament.service";
import {Observable, tap} from "rxjs";
import {TournamentStatus} from "../../../shared/enums/TournamentStatus";
import {TournamentIndex} from "../../../shared/models/TournamentIndex";
import {TournamentCategory} from "../../../shared/enums/TournamentCategory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tournament-index',
  templateUrl: './tournament-index.component.html',
  styleUrls: ['./tournament-index.component.scss']
})
export class TournamentIndexComponent implements OnInit{

    tournamentsSub$?: Observable<TournamentIndex>
    tournaments: Tournament[] | undefined = []
    tournamentCategories = this.enumToDropdownOptions(TournamentCategory);
    tournamentStatus = this.enumToDropdownOptions(TournamentStatus)

    searchForm: FormGroup
    showSearchForm!: boolean;

    constructor(private _tournamentService: TournamentService,
                private _formBuilder: FormBuilder) {

        this.searchForm = this._formBuilder.group({
            name: [null],
            category: [null],
            status: [null],
            womenOnly: [null]
        })

    }

    ngOnInit() {

        this.tournamentsSub$ = this._tournamentService.getTournaments({
            offset: undefined,
            name: undefined,
            category: undefined,
            status: undefined,
            womenOnly: undefined
        })
    }

    private enumToDropdownOptions(myEnum: any): any[] {
        return Object.keys(myEnum).map((key) => ({ name: myEnum[key], value: key }));
    }

    onSearch(){
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
            tap(data =>{
                this.tournaments = data.results
            } )
        )
    }

    onReset(){
        console.log("reset")
        this.searchForm.reset();
    }

    toggleShowForm(){
        this.showSearchForm = !this.showSearchForm
    }


    protected readonly TournamentCategory = TournamentCategory;
}
