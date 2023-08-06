import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {SessionService} from "../shared/services/session.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup
    username: string = ""
    password: string = ""

    loading: boolean = false;

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService,
                private _router: Router,
                private _sessionService: SessionService) {
        this.loginForm = this._formBuilder.group({
            username: [null, [
                Validators.required,
                Validators.minLength(1)
            ]],
            password: [null, [
                Validators.required,
                Validators.minLength(1)
            ]]
        })
    }

    onLogin() {
        this.username = this.loginForm.get("username")?.value
        this.password = this.loginForm.get("password")?.value
        this._authService.login(this.username, this.password).subscribe(data =>{
            this._sessionService.addToSession(data)
            this._router.navigateByUrl("/home")
        } )
    }

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }


}
