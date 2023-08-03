import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuItems: MenuItem[] | undefined;
    slideMenuItems: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;


    constructor() {
    }

    ngOnInit() {

        this.menuItems = [
            {icon: "pi pi-home", routerLink: "/home"},
            {icon: "pi pi-user"},
            {icon: "pi pi-sign-in", routerLink: "/login"}

        ];

        this.activeItem = this.menuItems[0];

        this.slideMenuItems = [
            {label: "Accueil", icon: "pi pi-home", routerLink: "/home"},
            {label: "Tournois", icon: "pi pi-list", routerLink: "/tournament/index"},
        ];
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event
    }
}
