import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    this.pictureUrl$ = afAuth.authState.pipe(map(user => user? user.photoURL : null));
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }
}
