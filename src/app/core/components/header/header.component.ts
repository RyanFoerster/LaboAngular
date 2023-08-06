import {Component, OnInit} from '@angular/core';
import {ConfirmationService, ConfirmEventType, MenuItem, MessageService} from "primeng/api";
import {SessionService} from "../../../shared/services/session.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class HeaderComponent implements OnInit {

    menuItems: MenuItem[] = [
        {icon: "pi pi-home", routerLink: "/home"},
        {icon: "pi pi-user", routerLink: "/members/change-password"},
    ];

    slideMenuItems: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;
    refreshNeeded = false;

    isAdmin: boolean = false

    logMenuItems = {
        signIn: {
            icon: "pi pi-sign-in",
            routerLink: "/login"
        },
        signOut: {
            icon: "pi pi-sign-out",
            command: () => this.confirm1()
        }
    }

    adminMenuItems = {
        adminMember: {
            label: "Nouveau membre",
            icon: "pi pi-plus",
            routerLink: "/members/add"
        },
        adminTournament: {
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
        }
    }

    constructor(private _sessionServ: SessionService,
                private _confirmationService: ConfirmationService,
                private _messagesService: MessageService) {
    }

    ngOnInit() {

        this._sessionServ.getTokenObservable().subscribe((token) => {
            this.refreshNeeded = true;

            this.menuItems.splice(2, 1)
            this.menuItems.push(token ? this.logMenuItems.signOut : this.logMenuItems.signIn)
            this.isAdmin = token?.user.role == "Admin"

            this.updateSlideMenuItems();

            setTimeout(() => this.refreshNeeded = false, 100)

        })

        this.activeItem = this.menuItems[0];

    }

    updateSlideMenuItems() {
        this.slideMenuItems = [
            {
                label: "Accueil",
                icon: "pi pi-home",
                routerLink: "/home"
            },
            {
                label: "Index",
                icon: "pi pi-list",
                routerLink: "/tournament/index"
            },

        ];

        if (this._sessionServ.getToken()){
            if (this.isAdmin) {
                this.slideMenuItems.splice(2, 0, this.adminMenuItems.adminMember);
                // @ts-ignore
                this.slideMenuItems.splice(1, 1, this.adminMenuItems.adminTournament)
            }
        }

    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event
    }

    onLogout() {
        this._sessionServ.removeFromSession()
    }

    confirm1() {
        this._confirmationService.confirm({
            message: 'Vous êtes sur de vouloir vous déconnecter ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.onLogout()
                this._messagesService.add({ severity: 'info', summary: 'Confirmed', detail: 'Vous avez été déconnecter' });
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this._messagesService.add({ severity: 'warn', summary: 'Rejected', detail: 'Vous avez annuler' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this._messagesService.add({ severity: 'warn', summary: 'Rejected', detail: 'Vous avez annuler' });
                        break;
                }
            }
        });
    }
}
