import { Component, OnInit } from '@angular/core';
import {Athlete} from "../models/athlete";
import {ActivatedRoute} from "@angular/router";
import {Result} from "../models/result";
import {AthletesService} from "../services/athletes.service";
import {finalize, first} from "rxjs";

@Component({
  selector: 'app-view-athlete',
  templateUrl: './view-athlete.component.html',
  styleUrls: ['./view-athlete.component.scss']
})
export class ViewAthleteComponent implements OnInit {
  athlete: Athlete;
  meetResults: Result[];
  loading: boolean = false;
  lastPageLoaded = 0;
  displayedColumns = ['meetDateTime', 'meetName', 'time', 'place'];

  constructor(private route: ActivatedRoute,
              private athletesService: AthletesService) { }

  ngOnInit(): void {
    this.athlete = this.route.snapshot.data.athlete;

    this.athletesService.findResults(this.athlete.id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        meetResults => this.meetResults = meetResults
      );
  }

  loadMore() {
    this.lastPageLoaded++;
    this.loading = true;

    this.athletesService.findResults(this.athlete.id, 'asc')
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        meetResults => this.meetResults = this.meetResults.concat(meetResults)
      )

  }
}
