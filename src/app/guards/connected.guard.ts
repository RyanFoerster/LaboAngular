import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from "../shared/services/session.service";
import { inject } from "@angular/core";

// Fonction de garde connectedGuard
export const connectedGuard: CanActivateFn = (route, state) => {
    // Injection des services nécessaires
    const _sessionService: SessionService = inject(SessionService);
    const _router: Router = inject(Router);

    // Vérifie si un jeton d'authentification est présent
    if (_sessionService.getToken()) {
        return true; // Autorise l'accès
    }

    _router.navigateByUrl("/login"); // Redirige vers la page de connexion
    return false; // Empêche l'accès
};
