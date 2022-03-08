import { Component, OnInit } from '@angular/core';
import {finalize, Observable} from "rxjs";
import {Athlete} from "../models/athlete";
import {Router} from "@angular/router";
import {AthletesService} from "../services/athletes.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;

  maleAthletes$: Observable<Athlete[]> | undefined

  femaleAthletes$: Observable<Athlete[]> | undefined

  constructor(
    private router: Router,
    private athletesService: AthletesService,
    public user: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.reloadAthletes();
  }

  reloadAthletes() {
    this.maleAthletes$ = this.athletesService.loadAthletesByGender('MALE').pipe(
        finalize(() => this.loading = false)
    );

    this.femaleAthletes$ = this.athletesService.loadAthletesByGender('FEMALE').pipe(
      finalize(() => this.loading = false)
    );
  }

}
