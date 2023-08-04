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
import {TableModule} from "primeng/table";
import {MegaMenuModule} from "primeng/megamenu";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {InputSwitchModule} from "primeng/inputswitch";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PaginatorModule} from "primeng/paginator";
import {PanelModule} from "primeng/panel";
import {StepsModule} from "primeng/steps";
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";
import {SpinnerModule} from "primeng/spinner";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    exports: [
        TabMenuModule,
        ButtonModule,
        SlideMenuModule,
        InputTextModule,
        PasswordModule,
        FieldsetModule,
        MessageModule,
        RippleModule,
        TableModule,
        MegaMenuModule,
        DropdownModule,
        MultiSelectModule,
        InputSwitchModule,
        ProgressSpinnerModule,
        PaginatorModule,
        PanelModule,
        StepsModule,
        ToastModule,
        CardModule,
        SpinnerModule
    ],
})
export class PrimeLibraryModule {
}
