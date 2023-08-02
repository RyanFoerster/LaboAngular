import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./components/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    CommonModule
  ]
})
export class HomeModule { }
