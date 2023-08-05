import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AddMemberComponent} from "./add-member/add-member.component";

const routes: Routes = [
    {
        path: 'add',
        component: AddMemberComponent
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
