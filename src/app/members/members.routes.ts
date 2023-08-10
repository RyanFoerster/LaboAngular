import {Routes} from "@angular/router";
import {adminGuard} from "../guards/admin.guard";
import {connectedGuard} from "../guards/connected.guard";
import {MemberService} from "../shared/services/member.service";

export default [{
    path: "",
    providers: [MemberService],
    children: [
        {
            path: 'add',
            title: "Add member",
            loadComponent: () => import("./add-member/add-member.component").then(module => module.AddMemberComponent),
            canActivate: [adminGuard]
        },
        {
            path: 'change-password',
            title: "Change your password",
            loadComponent: () => import("./change-password/change-password.component").then(module => module.ChangePasswordComponent),
            canActivate: [connectedGuard]
        }
    ]
}] as Routes
