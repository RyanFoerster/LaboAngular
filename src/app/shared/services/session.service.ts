import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Token } from "../models/Token";

@Injectable()
export class SessionService {

    private _tokenSubject: BehaviorSubject<Token | null>;

    constructor() {
        // Récupère le token depuis la session
        const tokenFromSession = sessionStorage.getItem('token');
        // Crée un BehaviorSubject initialisé avec le token de la session ou null s'il n'existe pas
        this._tokenSubject = new BehaviorSubject<Token | null>(tokenFromSession ? JSON.parse(tokenFromSession) : null);
    }

    addToSession(token: Token) {
        // Ajoute le token à la session
        sessionStorage.setItem('token', JSON.stringify(token));
        // Met à jour le BehaviorSubject avec le nouveau token
        this._tokenSubject.next(token);
    }

    removeFromSession(): void {
        // Supprime le token de la session
        sessionStorage.removeItem('token');
        // Met à jour le BehaviorSubject avec la valeur null
        this._tokenSubject.next(null);
    }

    clearSession(): void {
        // Supprime toutes les clés de la session
        sessionStorage.clear();
        // Met à jour le BehaviorSubject avec la valeur null
        this._tokenSubject.next(null);
    }

    getToken(): Token | null {
        // Récupère la valeur actuelle du BehaviorSubject
        return this._tokenSubject.getValue();
    }

    getTokenObservable(): Observable<Token | null> {
        // Renvoie un Observable qui émettra la valeur actuelle et toutes les mises à jour du BehaviorSubject
        return this._tokenSubject.asObservable();
    }

}
