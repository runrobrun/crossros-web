import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {catchError, finalize, Observable, tap, throwError} from 'rxjs';
import {Athlete} from '../models/athlete';
import {AthletesService} from '../services/athletes.service';
import {loadBundle} from '@angular/fire/firestore';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-athlete-list-view',
  templateUrl: './athlete-list-view.component.html',
  styleUrls: ['./athlete-list-view.component.scss']
})
export class AthleteListViewComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'gradYear', 'bagNumber'];
  allActiveAthletes: Athlete[] = [];
  loading = false;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private athletesService: AthletesService) { }

  ngOnInit(): void {
    this.loadAllActiveAthletes();
  }

  private loadAllActiveAthletes() {
    this.loading = true
    this.athletesService.getActiveAthletes(this.sort?.direction ?? 'asc', this.sort?.active ?? "lastName")
      .pipe(
        tap(athletes => this.allActiveAthletes = athletes),
        catchError(err => {
          console.log("Error loading athletes:", err);
          alert("Error loading athletes");
          return throwError(err);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe()
  }

  ngAfterViewInit(): void {

    this.sort.sortChange
      .pipe(
        tap(() => this.loadAllActiveAthletes())
      )
      .subscribe()

  }

}
