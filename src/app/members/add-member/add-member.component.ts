import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserGender} from "../../shared/enums/UserGender";
import {MemberService} from "../../shared/services/member.service";
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent {

    addMemberForm: FormGroup
    maxDate: Date = new Date()
    genders = this.enumToDropdownOptions(UserGender)
    isEmailAvailable: boolean | null = true
    isUsernameAvailable: boolean = true

    constructor(private _formBuilder: FormBuilder,
                private _memberService: MemberService,
                private _httpClient: HttpClient)
    {

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
        })

    }

    private enumToDropdownOptions(myEnum: any): any[] {
        return Object.keys(myEnum).map((key) => ({ name: myEnum[key], value: key }));
    }

    addMember(){
        if(this.addMemberForm.valid){
            this._memberService.addMember(this.addMemberForm.value).subscribe()
        }
    }

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
