import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Athlete} from '../models/athlete';
import {AthletesService} from '../services/athletes.service';

@Component({
  selector: 'app-athlete-list-view',
  templateUrl: './athlete-list-view.component.html',
  styleUrls: ['./athlete-list-view.component.scss']
})
export class AthleteListViewComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'gradYear', 'bagNumber'];
  allActiveAthletes$: Observable<Athlete[]>;

  constructor(private athletesService: AthletesService) { }

  ngOnInit(): void {
    this.loadAllActiveAthletes();
  }

  private loadAllActiveAthletes() {
    this.allActiveAthletes$ = this.athletesService.getActiveAthletes();
  }

}
