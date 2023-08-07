import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {strongPassword} from "../../shared/validators/password-validator";
import {MemberService} from "../../shared/services/member.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
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
export class ChangePasswordComponent implements OnInit{
    passwordForm: FormGroup
    animationState: boolean = false;


    constructor(private _formBuilder: FormBuilder,
                private _memberService: MemberService) {
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
        this.animationState = true
    }

    changePassword() {
        this._memberService.changePassword(this.passwordForm.value).subscribe(data => console.log(data))
    }
}
