import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {SessionService} from "../../../services/session.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuItems: MenuItem[]= [
        {icon: "pi pi-home", routerLink: "/home"},
        {icon: "pi pi-user"},


    ];
    slideMenuItems: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;

    logMenuItems = {
        signIn:  {
            icon: "pi pi-sign-in",
            routerLink: "/login"
        },
        signOut: {
            icon: "pi pi-sign-out",
            command: () => this.onLogout()
        }
    }


    constructor(private sessionServ: SessionService) {
    }

    ngOnInit() {

        this.sessionServ.getTokenObservable().subscribe((token) => {
            this.menuItems.splice(2, 1)
            if(token) {
                this.menuItems.push(this.logMenuItems.signOut)
            }
            else {
                this.menuItems.push(this.logMenuItems.signIn)
            }
            this.menuItems = [...this.menuItems]
        })

        // this.menuItems = [
        //     {icon: "pi pi-home", routerLink: "/home"},
        //     {icon: "pi pi-user"},
        //
        //
        // ];

        // if(!sessionStorage.getItem("token")){
        //     this.menuItems.push({
        //         icon: "pi pi-sign-in",
        //         routerLink: "/login"
        //     })
        // }else{
        //     this.menuItems.push({
        //         icon: "pi pi-sign-out",
        //         routerLink: "/login",
        //         command: () => this.onLogout()
        //     })
        // }


        this.activeItem = this.menuItems[0];

        this.slideMenuItems = [
            {label: "Accueil", icon: "pi pi-home", routerLink: "/home"},
            {label: "Tournois", icon: "pi pi-list", routerLink: "/tournament/index"},
        ];
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event
    }

    onLogout(){
        this.sessionServ.removeFromSession()
    }
}
