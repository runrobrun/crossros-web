import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {GlobalSettings} from "../global-settings";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {SeasonsService} from "../services/seasons.service";
import {Season} from "../models/season";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-season',
  templateUrl: './create-season.component.html',
  styleUrls: ['./create-season.component.scss']
})
export class CreateSeasonComponent implements OnInit {
  form = this.fb.group({
    startDate: ['', Validators.required],
    active: [false],
    endDate: ['', Validators.required],
    seasonTheme: [''],
    seasonYear: [GlobalSettings.activeSeason, Validators.required]
  });
  private seasonId;


  constructor(private fb: UntypedFormBuilder,
              private afs: AngularFirestore,
              private seasonsService: SeasonsService,
              private router: Router) { }

  ngOnInit(): void {
    this.seasonId = this.afs.createId();
  }

  onCreateSeason(): void {
    const val = this.form.value;
    const newSeason: Partial<Season> = {
      startDate: val.startDate,
      endDate: val.endDate,
      seasonYear: parseInt(val.seasonYear),
      seasonTheme: val.seasonTheme,
      active: val.active
    };
    if(newSeason.active) {
      this.seasonsService.toggleSeasons(false, this.seasonId);
    }
    this.seasonsService
      .createSeason(newSeason, this.seasonId)
      .pipe(
        tap(() =>{
          this.router.navigateByUrl(`/seasons/${newSeason.seasonYear}`)
        })
      )
      .subscribe();
  }

}
