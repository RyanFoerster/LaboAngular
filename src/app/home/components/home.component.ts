import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        // Définition de l'animation de la page
        trigger('pageAnimation', [
            transition(':enter', [
                style({ opacity: 0 }), // Style initial de l'élément : opacité à 0
                animate('300ms', style({ opacity: 1 })), // Animation de l'opacité à 1 en 300ms
            ]),
            transition(':leave', [
                animate('300ms', style({ opacity: 0 })), // Animation de l'opacité à 0 en 300ms lors de la sortie
            ]),
        ]),
    ],
    standalone: true, // Composant autonome
})
export class HomeComponent implements OnInit {

    animationState: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
        this.animationState = true; // Active l'état d'animation lors de l'initialisation du composant
    }
}
