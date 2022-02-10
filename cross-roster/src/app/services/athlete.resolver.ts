import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Athlete} from "../models/athlete";
import {AthletesService} from "./athletes.service";

@Injectable({
  providedIn: 'root'
})
export class AthleteResolver implements Resolve<Athlete> {
  constructor(private athletesService: AthletesService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Athlete> {
    const profileUrl = route.paramMap.get('profileUrl');
    return this.athletesService.findAthleteByUrl(profileUrl);
  }
}
