import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Athlete} from "../models/athlete";
import {Router} from "@angular/router";
import {AthletesService} from "../services/athletes.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  maleAthletes$: Observable<Athlete[]> | undefined

  femaleAthletes$: Observable<Athlete[]> | undefined

  constructor(
    private router: Router,
    private athletesService: AthletesService) { }

  ngOnInit(): void {
    this.reloadAthletes();
  }

  reloadAthletes() {
    this.maleAthletes$ = this.athletesService.loadAthletesByGender('MALE');

    this.femaleAthletes$ = this.athletesService.loadAthletesByGender('FEMALE');
  }

}
