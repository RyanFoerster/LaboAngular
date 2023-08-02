import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from "../services/session.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private readonly _sessionService: SessionService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if(this._sessionService.getToken()){
            const headers = new HttpHeaders({
                authorization: `Bearer ${this._sessionService.getToken()?.token}`
            })
            const newRequest = request.clone({headers})
            return next.handle(newRequest)
        }

        return next.handle(request);
    }
}
