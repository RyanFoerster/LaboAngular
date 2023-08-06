import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {registrationDateValidator} from "../../../shared/validators/registration-date-validator";
import {TournamentCategory} from "../../../shared/enums/TournamentCategory";
import {TournamentService} from "../../../shared/services/tournament.service";
import {Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.scss'],
    animations: [
        trigger('pageAnimation', [
            transition(':enter', [
                style({opacity: 0}),
                animate('300ms', style({opacity: 1})),
            ]),
            transition(':leave', [
                animate('300ms', style({opacity: 0})),
            ]),
        ]),
    ],
})
export class TournamentAddComponent implements OnInit{

    addForm: FormGroup

    tournamentCategories = this.enumToDropdownOptions(TournamentCategory);
    currentDate: Date = new Date()

    animationState: boolean = false;

    minDate: Date = this.currentDate;


    constructor(private _formBuilder: FormBuilder,
                private _tournamentService: TournamentService,
                private _router: Router) {

        this.addForm = this._formBuilder.group({
            name: [null, [
                Validators.required,
                Validators.maxLength(100),
                Validators.minLength(1)
            ]],
            location: [null, [
                Validators.maxLength(100)
            ]],
            minPlayers: [2, [
                Validators.max(16),
                Validators.min(2),
                Validators.required
            ]],
            maxPlayers: [2, [
                Validators.max(16),
                Validators.min(2),
                Validators.required
            ]],
            eloMin: [null, [
                Validators.max(3000),
                Validators.min(0)
            ]],
            eloMax: [null, [
                Validators.max(3000),
                Validators.min(0)
            ]],
            categories: [false, [
                Validators.required
            ]],
            womenOnly: [false, [
                Validators.required
            ]],
            endOfRegistrationDate: [null, [
                Validators.required,
                registrationDateValidator()
            ]]
        })
    }

    ngOnInit() {
        this.animationState = true
        this.currentDate.setDate(this.currentDate.getDate() + 3)
    }

    private enumToDropdownOptions(myEnum: any): any[] {
        return Object.keys(myEnum).map((key) => ({ name: myEnum[key], value: key }));
    }

    addTournament() {
        if (this.addForm.valid) {
            const date: Date = this.addForm.get('endOfRegistrationDate')?.value; // Obtenez la valeur de la date
            const categoriesModified = this.addForm.get('categories')?.value
            const categoriesName: string[] = []

            for (let categoriesModifiedElement of categoriesModified) {
                categoriesName.push(categoriesModifiedElement.name)
            }


            // Mettez à jour la valeur du champ endOfRegistrationDate avec la nouvelle date
            this.addForm.patchValue({
                categories: categoriesName
            });
            this._tournamentService.addTournament(this.addForm.value).subscribe(data => {
                console.log(data)
                this._router.navigateByUrl("/tournament/index")
            })
        }
    }
}
