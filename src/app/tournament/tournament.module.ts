import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TournamentIndexComponent} from './components/tournament-index/tournament-index.component';
import {TournamentRoutingModule} from "./tournament-routing.module";
import {PrimeLibraryModule} from "../shared/prime-library.module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { TournamentDetailsComponent } from './components/tournament-details/tournament-details.component';
import { TournamentAddComponent } from './components/tournament-add/tournament-add.component';


@NgModule({
    declarations: [
        TournamentIndexComponent,
        TournamentDetailsComponent,
        TournamentAddComponent
    ],
    imports: [
        CommonModule,
        TournamentRoutingModule,
        PrimeLibraryModule,
        FormsModule,
        SharedModule
    ]
})
export class TournamentModule {
}
