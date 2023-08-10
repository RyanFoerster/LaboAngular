import {Routes} from "@angular/router";
import {adminGuard} from "../guards/admin.guard";
import {TournamentService} from "../shared/services/tournament.service";
import {MatchService} from "../shared/services/match.service";

export default [{
    path: "",
    providers: [TournamentService, MatchService],
    children: [
        {
            path: 'index',
            title: "Tournaments index",
            loadComponent: () => import("./components/tournament-index/tournament-index.component").then(module => module.TournamentIndexComponent)
        },
        {
            path: 'details/:id',
            loadComponent: () => import("./components/tournament-details/tournament-details.component").then(module => module.TournamentDetailsComponent)
        },
        {
            path: 'add',
            title: "Add tournament",
            loadComponent: () => import("./components/tournament-add/tournament-add.component").then(module => module.TournamentAddComponent),
            canActivate: [adminGuard]
        }
    ]
}] as Routes
