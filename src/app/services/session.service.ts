import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Token} from "../shared/models/Token";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private _token: string = ""
    private _tokenSubject = new BehaviorSubject<Token | null>(null)

    constructor() {
        const tokenFromSession = sessionStorage.getItem(this._token)
        if(tokenFromSession){
            this._tokenSubject.next(JSON.parse(tokenFromSession))
        }
    }

    addToSession(token: Token) {
        sessionStorage.setItem(this._token, JSON.stringify(token));
        this._tokenSubject.next(token);
    }

    removeFromSession(): void {
        sessionStorage.removeItem(this._token);
        this._tokenSubject.next(null);
    }

    clearSession(): void{
        sessionStorage.clear();
        this._tokenSubject.next(null);
    }

    getToken(): Token | null {
        console.log( "Session service" + this._token)
        return this._tokenSubject.getValue();
    }

    getTokenObservable(): Observable<Token | null> {
        return this._tokenSubject.asObservable();
    }

}
