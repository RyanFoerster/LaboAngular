import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {TournamentModule} from "./tournament/tournament.module";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import { AddMemberComponent } from './members/add-member/add-member.component';
import {MembersModule} from "./members/members.module";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        AppRoutingModule,
        CoreModule,
        HomeModule,
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        TournamentModule,
        MembersModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
