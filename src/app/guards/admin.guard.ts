import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from "../shared/services/session.service";
import { inject } from "@angular/core";

// Fonction de garde adminGuard
export const adminGuard: CanActivateFn = (route, state) => {

    // Injection des services nécessaires
    const _sessionService: SessionService = inject(SessionService);
    const _router: Router = inject(Router);

    // Vérifie si un jeton d'authentification est présent
    if (_sessionService.getToken()) {
        // Vérifie si le rôle de l'utilisateur associé au jeton est 'Admin'
        if (_sessionService.getToken()?.user.role == 'Admin') {
            return true; // Autorise l'accès
        } else {
            _router.navigateByUrl("/home"); // Redirige vers la page d'accueil
            return false; // Empêche l'accès
        }
    }

    _router.navigateByUrl("/home"); // Redirige vers la page d'accueil si aucun jeton n'est présent
    return false; // Empêche l'accès
};
