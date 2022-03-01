import { Injectable } from '@angular/core';
import {Meet} from "../models/meet";
import {from, map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {convertSnaps} from "./data-utils";

@Injectable({
  providedIn: 'root'
})
export class MeetsService {

  constructor(private db: AngularFirestore) { }

  createMeet(newMeet: Partial<Meet>, meetId?: string): Observable<any> {
    let save$: Observable<any>;
    if (meetId) {
      save$ = from(this.db.doc(`meets/${meetId}`).set(newMeet));
    } else {
      save$ = from(this.db.collection('meets').add(newMeet));
    }

    return save$.pipe(
      map((res) => {
        return {
          id: meetId ?? res.id,
          ...newMeet,
        };
      })
    );
  }

  loadMeets(archived: boolean) {
    return this.db
      .collection('meets', (ref) => ref.where('archived', '==', archived).orderBy('meetName'))
      .get()
      .pipe(map((result) => convertSnaps<Meet>(result)));
  }

  updateMeet(meetId: string, changes: any) {
    return from(this.db.doc(`meets/${meetId}`).update(changes));
  }

  getMeetById(meetId: string): Observable<any> {
    return this.db.doc(`meets/${meetId}`).valueChanges();
  }

  deleteMeet(meetId: string) {
    return from(this.db.doc(`meets/${meetId}`).delete());
  }
}
