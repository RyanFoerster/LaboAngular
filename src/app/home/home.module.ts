import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../shared/shared.module";
import {PrimeLibraryModule} from "../shared/prime-library.module";


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        HomeRoutingModule,
        SharedModule,
        CommonModule,
        PrimeLibraryModule
    ]
})
export class HomeModule {
}
