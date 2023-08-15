import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserGender } from "../../shared/enums/UserGender";
import { MemberService } from "../../shared/services/member.service";
import { HttpClient } from "@angular/common/http";
import { environments } from "../../../environments/environments";
import { animate, style, transition, trigger } from "@angular/animations";
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { NgFor, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.scss'],
    animations: [
        // Définition de l'animation de la page
        trigger('pageAnimation', [
            transition(':enter', [
                style({ opacity: 0 }), // Style initial de l'élément : opacité à 0
                animate('300ms', style({ opacity: 1 })), // Animation de l'opacité à 1 en 300ms
            ]),
            transition(':leave', [
                animate('300ms', style({ opacity: 0 })), // Animation de l'opacité à 0 en 300ms lors de la sortie
            ]),
        ]),
    ],
    standalone: true,
    imports: [
        CardModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        NgIf,
        CalendarModule,
        InputNumberModule,
        NgFor,
        RadioButtonModule,
        ButtonModule,
    ],
})
export class AddMemberComponent implements OnInit {

    addMemberForm: FormGroup;
    maxDate: Date = new Date();
    genders = this.enumToDropdownOptions(UserGender);
    isEmailAvailable!: boolean;
    isUsernameAvailable!: boolean;
    animationState: boolean = false;

    constructor(private _formBuilder: FormBuilder,
                private _memberService: MemberService,
                private _httpClient: HttpClient) {

        // Crée le formulaire d'ajout de membre avec les validateurs requis
        this.addMemberForm = this._formBuilder.group({
            username: [null, [
                Validators.required,
                Validators.maxLength(100),
                Validators.minLength(1)
            ]],
            email: [null, [
                Validators.required,
                Validators.min(1),
                Validators.email
            ]],
            birthDate: [null, [
                Validators.required,
            ]],
            elo: [null, [
                Validators.max(3000),
                Validators.min(0)
            ]],
            gender: [null, [Validators.required]]
        });

    }

    ngOnInit() {
        this.animationState = true; // Active l'état d'animation lors de l'initialisation du composant
    }

    // Convertit une énumération en options de liste déroulante
    private enumToDropdownOptions(myEnum: any): any[] {
        return Object.keys(myEnum).map((key) => ({ name: myEnum[key], value: key }));
    }

    // Méthode appelée lors de l'ajout d'un membre
    addMember() {
        if (this.addMemberForm.valid) {
            this._memberService.addMember(this.addMemberForm.value).subscribe();
        }
    }

    // Vérifie la disponibilité de l'adresse e-mail
    checkEmailAvailability() {
        const email = this.addMemberForm.get('email')?.value;

        if (email) {
            this._httpClient.head<any>(`${environments.apiUrl}/Member/existsEmail?Email=${encodeURIComponent(email)}`).subscribe(
                (response) => {
                    this.isEmailAvailable = false;
                },
                (error) => {
                    this.isEmailAvailable = true;
                }
            );
        } else {
            this.isEmailAvailable = false;
        }
    }

    // Vérifie la disponibilité du nom d'utilisateur
    checkUsernameAvailability() {
        const username = this.addMemberForm.get('username')?.value;

        if (username) {
            this._httpClient.head<any>(`${environments.apiUrl}/Member/existsUsername?Username=${username}`).subscribe(
                (response) => {
                    this.isUsernameAvailable = false;
                },
                (error) => {
                    this.isUsernameAvailable = true;
                }
            );
        } else {
            this.isUsernameAvailable = false;
        }
    }
}
