import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TournamentIndexComponent} from './components/tournament-index/tournament-index.component';
import {TournamentRoutingModule} from "./tournament-routing.module";
import {PrimeLibraryModule} from "../shared/prime-library.module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        TournamentIndexComponent
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
