import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Season} from "../models/season";
import {SeasonsService} from "./seasons.service";

@Injectable({
  providedIn: 'root'
})
export class SeasonResolver implements Resolve<Season> {
  constructor(private seasonsService: SeasonsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Season> {
    const seasonYear = route.paramMap.get('seasonYear');
    return this.seasonsService.findSeasonBySeasonYear(seasonYear);
  }
}
