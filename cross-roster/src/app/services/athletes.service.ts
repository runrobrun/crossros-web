import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {Athlete} from "../models/athlete";
import {convertSnaps} from "./data-utils";

@Injectable({
  providedIn: 'root'
})
export class AthletesService {

  constructor(private db: AngularFirestore) { }

  loadAthletesByGender(gender: string): Observable<Athlete[]> {
    return this.db.collection(
      'athletes',
      ref => ref.where('gender', '==', gender)
        .orderBy('lastName', 'asc'))
      .get()
      .pipe(
        map(result => convertSnaps<Athlete>(result))
      )
  }

}
