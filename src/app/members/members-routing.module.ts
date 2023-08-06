import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddMemberComponent} from "./add-member/add-member.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
    {
        path: 'add',
        component: AddMemberComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
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
