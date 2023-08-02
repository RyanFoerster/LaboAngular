import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {SharedModule} from "../shared/shared.module";
import {PrimeLibraryModule} from "../shared/prime-library.module";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimeLibraryModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
