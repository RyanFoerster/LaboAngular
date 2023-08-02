import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabMenuModule} from "primeng/tabmenu";
import {ButtonModule} from "primeng/button";
import {SlideMenuModule} from "primeng/slidemenu";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {FieldsetModule} from "primeng/fieldset";
import {MessageModule} from "primeng/message";
import {RippleModule} from "primeng/ripple";


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        TabMenuModule,
        ButtonModule,
        SlideMenuModule,
        InputTextModule,
        PasswordModule,
        FieldsetModule,
        MessageModule,
        RippleModule
    ]
})
export class PrimeLibraryModule {
}
