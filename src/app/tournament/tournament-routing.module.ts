import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TournamentIndexComponent} from "./components/tournament-index/tournament-index.component";

const routes: Routes = [
    {
        path: '',
        component: TournamentIndexComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TournamentRoutingModule {
}
