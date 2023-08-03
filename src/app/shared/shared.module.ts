import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeLibraryModule} from "./prime-library.module";
import {AuthService} from "./services/auth.service";


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        ReactiveFormsModule,
        PrimeLibraryModule,
        FormsModule
    ],
    providers: [
        AuthService
    ]
})
export class SharedModule {
}
