import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";
import { SessionService } from "../shared/services/session.service";
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, InputTextModule, NgIf, PasswordModule, ButtonModule]
})
export class LoginComponent {
    loginForm: FormGroup;
    username: string = "";
    password: string = "";

    loading: boolean = false;

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService,
                private _router: Router,
                private _sessionService: SessionService) {
        // Crée le formulaire de connexion avec les validateurs requis
        this.loginForm = this._formBuilder.group({
            username: [null, [
                Validators.required,
                Validators.minLength(1)
            ]],
            password: [null, [
                Validators.required,
                Validators.minLength(1)
            ]]
        });
    }

    // Méthode appelée lors de la soumission du formulaire de connexion
    onLogin() {
        this.username = this.loginForm.get("username")?.value;
        this.password = this.loginForm.get("password")?.value;
        // Appelle le service d'authentification pour se connecter
        this._authService.login(this.username, this.password).subscribe(data => {
            // Ajoute les données de session au service de session
            this._sessionService.addToSession(data);
            // Redirige vers la page d'accueil
            this._router.navigateByUrl("/home");
        });
    }

    // Méthode pour simuler un chargement
    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }
}
