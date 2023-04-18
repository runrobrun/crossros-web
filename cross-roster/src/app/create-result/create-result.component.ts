import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Result} from "../models/result";
import {AthletesService} from "../services/athletes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Athlete} from "../models/athlete";

@Component({
  selector: 'app-create-result',
  templateUrl: './create-result.component.html',
  styleUrls: ['./create-result.component.scss']
})
export class CreateResultComponent implements OnInit {

  private athleteId: string = this.route.snapshot.paramMap.get('id');
  athlete: Observable<Athlete>;


  form = this.fb.group({
    distanceInMiles: [3.1, Validators.required],
    meetDateTime: ['', Validators.required],
    meetName: ['', Validators.required],
    place: [],
    season: [2020],
    time: [''],
  });
  private resultId: string;

  constructor(private fb: UntypedFormBuilder,
              private afs: AngularFirestore,
              private athletesService: AthletesService,
              private route: ActivatedRoute,
              private router: Router) {
    this.athlete = this.athletesService.getAthleteById(this.athleteId);
  }

  ngOnInit(): void {
    this.resultId = this.afs.createId();
  }

  private getTime(res): number {
    const timeArray = res.split(':');
    return parseInt(timeArray[0]) * 60 + parseFloat(timeArray[1])
  }

  private getPace(timeInSeconds: number, distance: number) {
    const totalMin = timeInSeconds / 60;
    const pace = totalMin / distance;
    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.round((pace - paceMinutes) * 60)
    if (paceSeconds < 10) {
      return paceMinutes + ":0" + paceSeconds;
    } else {
      return paceMinutes + ":" + paceSeconds;
    }
  }


  onCreateResult() {
    const val = this.form.value;

    const newResult: Partial<Result> = {
      distanceInMiles: parseFloat(val.distanceInMiles),
      place: parseInt(val.place),
      season: parseInt(val.season),
      meetDateTime: val.meetDateTime,
      time: val.time,
      meetName: val.meetName,
      timeInSeconds: null,
      pace: null,
    }

    newResult.timeInSeconds = this.getTime(newResult.time);
    newResult.pace = this.getPace(newResult.timeInSeconds, newResult.distanceInMiles);

    console.log(newResult.pace)

    this.athletesService
      .createResult(newResult, this.resultId, this.athleteId)
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/athletes');
        }),
        catchError((err) => {
          console.log(err);
          alert('could not create result');
          return throwError(err);
        })
      )
      .subscribe();
  }


}
