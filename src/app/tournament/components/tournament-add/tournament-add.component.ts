import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {registrationDateValidator} from "../../../shared/validators/registration-date-validator";
import {TournamentCategory} from "../../../shared/enums/TournamentCategory";
import {TournamentService} from "../../../shared/services/tournament.service";
import { Router, RouterLink } from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-tournament-add',
    templateUrl: './tournament-add.component.html',
    styleUrls: ['./tournament-add.component.scss'],
    animations: [
        trigger('pageAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('300ms', style({ opacity: 0 })),
            ]),
        ]),
    ],
    standalone: true,
    imports: [
        ButtonModule,
        RouterLink,
        CardModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        NgIf,
        InputNumberModule,
        MultiSelectModule,
        CalendarModule,
        InputSwitchModule,
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

    get categoryFormArray(): FormArray {
        return this.addForm.get('categories') as FormArray;
    }

    updateCategories(event: any) {
        const value = event.target.value;
        if (event.target.checked) {
            this.categoryFormArray.push(this._formBuilder.control(value));
        } else {
            const index = this.categoryFormArray.value.indexOf(value);
            if (index >= 0) {
                this.categoryFormArray.removeAt(index);
            }
        }
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
            console.log(this.addForm.value)
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
                this._router.navigateByUrl("/tournament/index")
            })
        }
    }
}
