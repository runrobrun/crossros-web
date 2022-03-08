import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {log} from "util";
import {UserRoles} from "../models/user-roles";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string>;
  userId$: Observable<string>;
  roles$: Observable<UserRoles>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
    this.pictureUrl$ = afAuth.authState.pipe(map(user => user? user.photoURL : null));
    this.userId$ = afAuth.authState.pipe(map(user => user? user.uid: null));
    this.roles$ = this.afAuth.idTokenResult
      .pipe(
        map(token => <any>token?.claims ?? {admin: false})
      );
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
  }
}
