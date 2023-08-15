import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService, SharedModule } from "primeng/api";
import { SessionService } from "../../../shared/services/session.service";
import { Router } from "@angular/router";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [ConfirmationService, MessageService],
    standalone: true,
    imports: [NgIf, ProgressSpinnerModule, ButtonModule, SlideMenuModule, TabMenuModule, ToastModule, ConfirmDialogModule, SharedModule]
})
export class HeaderComponent implements OnInit {

    menuItems: MenuItem[] = [
        { icon: "pi pi-home", routerLink: "/home" }, // Élément de menu pour la page d'accueil
        { icon: "pi pi-user", routerLink: "/members/change-password" }, // Élément de menu pour la modification du mot de passe des membres
    ];

    slideMenuItems: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;
    refreshNeeded = false;

    isAdmin: boolean = false;

    logMenuItems = {
        signIn: {
            icon: "pi pi-sign-in",
            routerLink: "/login"
        },
        signOut: {
            icon: "pi pi-sign-out",
            command: () => this.confirm1()
        }
    };

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
    };

    constructor(private _sessionServ: SessionService,
                private _confirmationService: ConfirmationService,
                private _messagesService: MessageService,
                private _router: Router) {
    }

    ngOnInit() {
        // Abonnez-vous à l'observable du token de session pour mettre à jour les menus en fonction de l'état de connexion
        this._sessionServ.getTokenObservable().subscribe((token) => {
            this.refreshNeeded = true;

            // Mettre à jour les éléments de menu en fonction de l'état de connexion
            this.menuItems.splice(2, 1);
            this.menuItems.push(token ? this.logMenuItems.signOut : this.logMenuItems.signIn);
            this.isAdmin = token?.user.role == "Admin";

            this.updateSlideMenuItems();

            setTimeout(() => this.refreshNeeded = false, 100);
        });

        this.activeItem = this.menuItems[0]; // Définir le premier élément de menu comme actif par défaut
    }

    // Mettre à jour les éléments de menu du menu déroulant en fonction de l'état de connexion et des autorisations d'administration
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

        if (this._sessionServ.getToken()) {
            if (this.isAdmin) {
                this.slideMenuItems.splice(2, 0, this.adminMenuItems.adminMember);
                // @ts-ignore
                this.slideMenuItems.splice(1, 1, this.adminMenuItems.adminTournament);
            }
        }
    }

    // Gérer le changement d'élément actif dans le menu principal
    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }

    // Gérer la déconnexion de l'utilisateur
    onLogout() {
        this._sessionServ.removeFromSession();
        this._router.navigateByUrl("/home");
    }

    // Afficher une boîte de confirmation avant la déconnexion
    confirm1() {
        this._confirmationService.confirm({
            message: 'Vous êtes sûr de vouloir vous déconnecter ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.onLogout();
                this._messagesService.add({ severity: 'info', summary: 'Confirmed', detail: 'Vous avez été déconnecté' });
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this._messagesService.add({ severity: 'warn', summary: 'Rejected', detail: 'Vous avez annulé' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this._messagesService.add({ severity: 'warn', summary: 'Rejected', detail: 'Vous avez annulé' });
                        break;
                }
            }
        });
    }
}
