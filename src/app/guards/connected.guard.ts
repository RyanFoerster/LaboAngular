import {CanActivateFn, Router} from '@angular/router';
import {SessionService} from "../shared/services/session.service";
import {inject} from "@angular/core";

export const connectedGuard: CanActivateFn = (route, state) => {
    const _sessionService: SessionService = inject(SessionService)
    const _router: Router = inject(Router)

    if(_sessionService.getToken()){
        return true
    }


    _router.navigateByUrl("/login")
    return false;
};
