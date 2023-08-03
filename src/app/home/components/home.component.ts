import {Component, OnInit} from '@angular/core';
import {Tournament} from "../../shared/models/Tournament";
import {TournamentService} from "../../shared/services/tournament.service";
import {Observable, tap} from "rxjs";
import {TournamentIndex} from "../../shared/models/TournamentIndex";
import {SessionService} from "../../services/session.service";
import {User} from "../../shared/models/User";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


    constructor() {
    }

    ngOnInit(): void {

    }


}
