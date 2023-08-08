import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TournamentIndexComponent} from "./components/tournament-index/tournament-index.component";
import {TournamentDetailsComponent} from "./components/tournament-details/tournament-details.component";
import {TournamentAddComponent} from "./components/tournament-add/tournament-add.component";
import {adminGuard} from "../guards/admin.guard";

const routes: Routes = [
    {
        path: 'index',
        component: TournamentIndexComponent
    },
    {
        path: 'details/:id',
        component: TournamentDetailsComponent
    },
    {
        path: 'add',
        component: TournamentAddComponent,
        canActivate: [adminGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TournamentRoutingModule {
}
