import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddMemberComponent} from "./add-member/add-member.component";
import {PrimeLibraryModule} from "../shared/prime-library.module";
import {SharedModule} from "../shared/shared.module";
import {MembersRoutingModule} from "./members-routing.module";
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
    declarations: [
        AddMemberComponent,
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        PrimeLibraryModule,
        SharedModule,
        MembersRoutingModule
    ]
})
export class MembersModule {
}
