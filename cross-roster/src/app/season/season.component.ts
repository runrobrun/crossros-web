import { Component, OnInit } from '@angular/core';
import {Season} from "../models/season";
import {Athlete} from "../models/athlete";
import {map, Observable} from "rxjs";
import {Meet} from "../models/meet";
import {SeasonsService} from "../services/seasons.service";
import {ActivatedRoute} from "@angular/router";
import {AthletesService} from "../services/athletes.service";

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {

  season: Season;
  seasonId: string;
  private seasonYear: string = this.route.snapshot.paramMap.get('seasonYear');
  roster: Athlete[];
  seasonMeets$: Observable<Meet[] | undefined>;
  activeSeason$: Observable<Season>;
  maleAthletes$: Observable<Athlete[]>;
  femaleAthletes$: Observable<Athlete[]>;
  displayedColumns = ['meetName', 'date'];

  constructor( private seasonsService: SeasonsService,
               private route: ActivatedRoute,
               private athletesService: AthletesService) {
    this.season = this.route.snapshot.data.season;
  }

  ngOnInit(): void {
    this.loadMeets();
    this.loadAthletes();
  }

  loadMeets(): void {
    this.seasonMeets$ = this.seasonsService.loadActiveSeasonSchedule(this.season.id);
  }

  loadAthletes(): void {
    this.femaleAthletes$ = this.athletesService.loadActiveAthletesByGender('FEMALE');
    this.maleAthletes$ = this.athletesService.loadActiveAthletesByGender('MALE');
  }

  onToggleSeason(active): void {
    if (active) {
      this.seasonsService.deactivateSeason(this.season.id).subscribe();
    } else {
      let activeSeason = this.seasonsService.getActiveSeason();
      console.log(activeSeason)
      if (activeSeason.length > 0) {
        this.seasonsService.deactivateSeason(activeSeason[0].id).subscribe();
      }
      this.seasonsService.activateSeason(this.season.id).subscribe();
    }
  }

}
