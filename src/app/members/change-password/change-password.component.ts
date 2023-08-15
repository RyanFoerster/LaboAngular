import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { strongPassword } from "../../shared/validators/password-validator";
import { MemberService } from "../../shared/services/member.service";
import { animate, style, transition, trigger } from "@angular/animations";
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
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
    // Importation des modules nécessaires
    imports: [
        CardModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordModule,
        NgIf,
        ButtonModule,
    ],
})
export class ChangePasswordComponent implements OnInit {
    passwordForm: FormGroup;
    animationState: boolean = false;

    constructor(private _formBuilder: FormBuilder,
                private _memberService: MemberService) {
        // Initialisation du formulaire avec les validateurs requis
        this.passwordForm = this._formBuilder.group({
            oldPassword: [null, [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50)
            ]],
            password: [null, [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(50),
                strongPassword()
            ]]
        })
    }

    ngOnInit() {
        this.animationState = true;
    }

    changePassword() {
        // Appel du service de changement de mot de passe
        this._memberService.changePassword(this.passwordForm.value).subscribe(data => console.log(data));
    }
}
