import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: "home", loadChildren: () => import("./home/home.module").then(m => m.HomeModule)},
  {path: "login", component: LoginComponent},
  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
