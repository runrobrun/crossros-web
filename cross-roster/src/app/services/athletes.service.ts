import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {from, map, Observable} from "rxjs";
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

  createAthlete(newAthlete: Partial<Athlete>, athleteId?: string): Observable<any> {
    let save$: Observable<any>;

    if (athleteId) {
      save$ = from(this.db.doc(`athletes/${athleteId}`).set(newAthlete));
    } else {
      save$ = from(this.db.collection('athletes').add(newAthlete));
    }

    return save$.pipe(
      map((res) => {
        return {
          id: athleteId ?? res.id,
          ...newAthlete,
        };
      })
    );
  }

  updateAthlete(athleteId: string, changes: Partial<Athlete>): Observable<any> {
    return from(this.db.doc(`athletes/${athleteId}`).update(changes));
  }

  deleteAthlete(athleteId: string) {
    return from(this.db.doc(`athletes/${athleteId}`).delete());
  }
}
