import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {first, from, map, Observable} from "rxjs";
import {Athlete} from "../models/athlete";
import {convertSnaps} from "./data-utils";
import {Result} from "../models/result";
import firebase from "firebase/compat";
import OrderByDirection = firebase.firestore.OrderByDirection;

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

  findAthleteByUrl(profileUrl: string): Observable<Athlete | null> {
    return this.db
      .collection('athletes', (ref) => ref.where('profileUrl', '==', profileUrl))
      .get()
      .pipe(
        map((results) => {
          const athletes = convertSnaps<Athlete>(results);
          return athletes.length === 1 ? athletes[0] : null;
        })
      );
  }

  loadActiveAthletesByGender(gender: string): Observable<Athlete[]> {
    return this.db
      .collection('athletes', (ref) => ref.where('gender', '==', gender)
        .where('active', '==', true)
        .orderBy('lastName'))
      .get()
      .pipe(map((result) => convertSnaps<Athlete>(result)));
  }

  getActiveAthletes(direction: any, sortField: string): Observable<Athlete[]> {
    return this.db
      .collection('athletes', (ref) => ref.where('active', '==', true)
        .orderBy('lastName', direction))
      .get()
      .pipe(map((result) => convertSnaps<Athlete>(result)));

  }

  createResult(newResult: Partial<Result>, resultId: string, athleteId: string) {
    let saveResult$: Observable<any>;

    if (resultId) {
      saveResult$ = from(this.db.doc(`athletes/${athleteId}/meetResults/${resultId}`).set(newResult));
    } else {
      saveResult$ = from(this.db.collection(`athletes/${athleteId}/meetResults`).add(newResult));
    }

    return saveResult$.pipe(
      map((res) => {
        return {
          id: resultId ?? res.id,
          ...newResult,
        };
      })
    );
  }

  getAthleteById(athleteId: string): Observable<any> {
    return this.db.doc(`athletes/${athleteId}`).valueChanges();
  }

  findResults(athleteId: string, sortOrder: OrderByDirection = 'asc'): Observable<Result[]> {
    return this.db.collection(`athletes/${athleteId}/meetResults`,
      ref => ref.orderBy('meetName', sortOrder))
      .get()
      .pipe(
        map(meetResults => convertSnaps<Result>(meetResults))
      )
  }

  loadMaleAthletesByClass(classToShow) {
    if (!classToShow) {
      return this.db.collection(
        'athletes',
        ref => ref.where('active', '==', true).where('gender', '==', 'MALE')
          .orderBy('lastName', 'asc'))
        .get()
        .pipe(
          map(result => convertSnaps<Athlete>(result))
        )
    } else {
      return this.db.collection(
        'athletes',
        ref => ref.where('active', '==', true).where('gender', '==', 'MALE')
          .where('gradYear', '==', classToShow)
          .orderBy('lastName', 'asc'))
        .get()
        .pipe(
          map(result => convertSnaps<Athlete>(result))
        )
    }
  }

  loadFemaleAthletesByClass(classToShow) {
    if (!classToShow) {
      return this.db.collection(
        'athletes',
        ref => ref.where('active', '==', true).where('gender', '==', 'FEMALE')
          .orderBy('lastName', 'asc'))
        .get()
        .pipe(
          map(result => convertSnaps<Athlete>(result))
        )
    } else {
      return this.db.collection(
        'athletes',
        ref => ref.where('active', '==', true).where('gender', '==', 'FEMALE')
          .where('gradYear', '==', classToShow)
          .orderBy('lastName', 'asc'))
        .get()
        .pipe(
          map(result => convertSnaps<Athlete>(result))
        )
    }
  }
}
