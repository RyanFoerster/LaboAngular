import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
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
    refreshNeeded = false;

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

    constructor(private _sessionServ: SessionService) {
    }

    ngOnInit() {

        this._sessionServ.getTokenObservable().subscribe((token) => {
            this.refreshNeeded = true;

            this.menuItems.splice(2,1)
            this.menuItems.push(token ? this.logMenuItems.signOut : this.logMenuItems.signIn)

            setTimeout(() => this.refreshNeeded = false, 100)

        })

        this.activeItem = this.menuItems[0];

        this.slideMenuItems = [
            {
                label: "Accueil",
                icon: "pi pi-home",
                routerLink: "/home"
            },
            {
                label: "Tournois",
                icon: "pi pi-calendar",
                items: [
                    {
                        label: "Index",
                        icon: "pi pi-list",
                        routerLink: "/tournament/index"
                    },
                    {
                        label: "Nouveau",
                        icon: "pi pi-plus-circle",
                        routerLink: "/tournament/add"
                    }
                ]
            },
            {
                label: "Nouveau membre",
                icon: "pi pi-user-plus",
                routerLink: "/members/add"
            },
            {
                separator: true
            },
            {
                label: 'Quit',
                icon: 'pi pi-fw pi-power-off',
                command: () => this.onLogout()
            }
        ];
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event
    }

    onLogout(){
        this._sessionServ.removeFromSession()
    }
}
