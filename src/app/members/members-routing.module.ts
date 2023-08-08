import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddMemberComponent} from "./add-member/add-member.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {adminGuard} from "../guards/admin.guard";
import {connectedGuard} from "../guards/connected.guard";

const routes: Routes = [
    {
        path: 'add',
        component: AddMemberComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [connectedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [

    ]
})
export class MembersRoutingModule {
}
