import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {from, map, Observable, tap} from "rxjs";
import {convertSnaps} from "./data-utils";
import {Season} from "../models/season";
import {Meet} from "../models/meet";

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  season: Season;
  activeSeason: Season[];

  constructor(private db: AngularFirestore) {
    this.findActiveSeason()
      .subscribe((results) => (this.activeSeason = results))
  }

  findSeasonBySeasonYear(seasonYear: string) {
    console.log(seasonYear);
    return this.db
      .collection('seasons', (ref) => ref.where('seasonYear', '==', parseInt(seasonYear)))
      .get()
      .pipe(
        map((results) => {
          const seasons = convertSnaps<Season>(results);
          return seasons.length === 1 ? seasons[0] : null;
        })
      );
  }

  loadActiveSeasonSchedule(seasonId) {
    return this.db
      .collection(`seasons/${seasonId}/seasonSchedule`)
      .get()
      .pipe(
        map((result) => {
          const meets = convertSnaps<Meet>(result);
          return meets.length >= 1 ? meets : null;
        })
      );
  }

  createSeason(newSeason: Partial<Season>, seasonId?: string): Observable<any> {
    let save$: Observable<any>;
    if (seasonId) {
      save$ = from(this.db.doc(`seasons/${seasonId}`).set(newSeason));
    } else {
      save$ = from(this.db.collection('seasons').add(newSeason));
    }

    return save$.pipe(
      map((res) => {
        return {
          id: seasonId ?? res.id,
          ...newSeason
        };
      })
    );
  }

  deactivateSeason(seasonId: string, changes?: any): Observable<any> {
    return from(this.db.doc(`seasons/${seasonId}`).update({"active": false}))
  }

  getActiveSeason() {
    return this.activeSeason || null;
  }

  private findActiveSeason() {
    return this.db
      .collection(`seasons`, (ref) => ref.where('active', '==', true))
      .get()
      .pipe(map((results) => convertSnaps<Season>(results)));
  }

  activateSeason(seasonId: string) {
    return from(this.db.doc(`seasons/${seasonId}`).update({"active": true}))
  }

  toggleSeasons(active, seasonId) {
    if (active) {
      this.deactivateSeason(seasonId).subscribe();
    } else {
      let activeSeason = this.getActiveSeason();
      console.log(activeSeason)
      if (activeSeason.length > 0) {
        this.deactivateSeason(activeSeason[0].id).subscribe();
      }
      this.activateSeason(seasonId).subscribe();
    }
  }
}
