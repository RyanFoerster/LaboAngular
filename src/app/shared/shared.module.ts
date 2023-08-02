import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {PrimeLibraryModule} from "./prime-library.module";
import {AuthService} from "./services/auth.service";


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        ReactiveFormsModule,
        PrimeLibraryModule
    ],
    providers: [
        AuthService
    ]
})
export class SharedModule {
}
