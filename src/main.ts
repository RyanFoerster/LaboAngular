import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthService } from './app/shared/services/auth.service';
import { provideRouter, Routes } from '@angular/router';
import { SessionService } from './app/shared/services/session.service';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';

const routes: Routes = [
    {
        path: "home",
        title: "Home",
        loadComponent: () => import("./app/home/components/home.component").then(m => m.HomeComponent)
    },
    {
        path: "tournament",
        loadChildren: () => import("./app/tournament/tournament.routes")
    },
    {
        path: "members",
        loadChildren: () => import("./app/members/members.routes")
    },
    {
        path: "login",
        title: "Login",
        providers: [AuthService],
        loadComponent: () => import("./app/login/login.component").then(module => module.LoginComponent)
    },
    {
        path: "**",
        redirectTo: "home",
        pathMatch: "full"
    }
];



bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        SessionService,
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
