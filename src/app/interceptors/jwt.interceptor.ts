import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from "../services/session.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private readonly _sessionService: SessionService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (this._sessionService.getToken()) {
            let headers = new HttpHeaders()
            const token = this._sessionService.getToken()?.token
            headers = headers.append('Authorization', `Bearer ${token}`)
            const newRequest = request.clone({headers: headers})
            return next.handle(newRequest)
        }

        return next.handle(request);
    }
}
