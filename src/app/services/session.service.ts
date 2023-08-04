import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Token} from "../shared/models/Token";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private _token: string = ""
    private _tokenSubject: BehaviorSubject<Token | null>

    constructor() {
        const tokenFromSession = sessionStorage.getItem(this._token)
        this._tokenSubject = new BehaviorSubject<Token | null>(tokenFromSession ? JSON.parse(tokenFromSession) : null)
    }

    addToSession(token: Token) {
        sessionStorage.setItem("token", JSON.stringify(token));
        this._tokenSubject.next(token);
    }

    removeFromSession(): void {
        sessionStorage.removeItem("token");
        this._tokenSubject.next(null);
    }

    clearSession(): void{
        sessionStorage.clear();
        this._tokenSubject.next(null);
    }

    getToken(): Token | null {
        return this._tokenSubject.getValue();
    }

    getTokenObservable(): Observable<Token | null> {
        return this._tokenSubject.asObservable();
    }

}
