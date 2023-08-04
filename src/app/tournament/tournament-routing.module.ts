import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TournamentIndexComponent} from "./components/tournament-index/tournament-index.component";
import {TournamentDetailsComponent} from "./components/tournament-details/tournament-details.component";

const routes: Routes = [
    {
        path: 'index',
        component: TournamentIndexComponent
    },
    {
        path: 'details/:id',
        component: TournamentDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TournamentRoutingModule {
}
