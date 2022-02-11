import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Result} from "../models/result";
import {AthletesService} from "../services/athletes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-create-result',
  templateUrl: './create-result.component.html',
  styleUrls: ['./create-result.component.scss']
})
export class CreateResultComponent implements OnInit {
  private athleteId: string = this.route.snapshot.paramMap.get('id');
  form = this.fb.group({
    distanceInMiles: [3.1, Validators.required],
    meet: ['', Validators.required],
    place: [],
    season: [2020],
    time: [''],
  });
  private resultId: string;

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore,
              private athletesService: AthletesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.resultId = this.afs.createId();
  }

  private getTime(res): number {
    const timeArray = res.split(':');
    return parseInt(timeArray[0]) * 60 + parseInt(timeArray[1])
  }

  private getPace(timeInSeconds: number, distance: number) {
    const quotient = Math.floor(timeInSeconds/distance);
    const remainder = timeInSeconds % distance;
    return quotient.toString + ":" + remainder.toString;
  }


  onCreateResult() {
    const val = this.form.value;

    const newResult: Partial<Result> = {
      distanceInMiles: parseInt(val.distanceInMiles),
      place: parseInt(val.place),
      season: parseInt(val.season),
      time: val.time,
      meetName: val.meet,
      timeInSeconds: null,
      pace: null,
    }

    newResult.timeInSeconds = this.getTime(newResult.time);
    newResult.pace = this.getPace(newResult.timeInSeconds, newResult.distanceInMiles);

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
