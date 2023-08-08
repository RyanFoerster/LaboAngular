import {CanActivateFn, Router} from '@angular/router';
import {SessionService} from "../shared/services/session.service";
import {inject} from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {

    const _sessionService: SessionService = inject(SessionService)
    const _router: Router = inject(Router)

    if(_sessionService.getToken()){
        if (_sessionService.getToken()?.user.role == 'Admin'){
            return true
        }else{
            _router.navigateByUrl("/home")
            return false
        }

    }

    _router.navigateByUrl("/home")
    return false
};
