import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebaseui from "firebaseui";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import firebase from "firebase/compat/app";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {map} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI;


  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private db: AngularFirestore,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.afAuth.app.then(app => {
      const uiConfig = {
        signInOptions: [
          EmailAuthProvider.PROVIDER_ID,
          GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
        }
      };
      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start('#firebaseui-auth-container', uiConfig);
      this.ui.disableAutoSignIn();
    })
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  userExists(uid: string) {
    return this.db.firestore.doc(`/users/${uid}`).get()
      .then(docSnapshot => {
        console.log("snapshot exists", docSnapshot.exists);
        return docSnapshot.exists;
      });
  }

  onLoginSuccessful() {

    this.afAuth.app.then(cred => {
      let uid = cred.auth().currentUser.uid;
      if (this.userExists(uid)) {
        return this.db.collection(`users`).doc(uid)
          .set({});
      } else {
        return null;
      }
    })
    this.router.navigateByUrl('/')
  }

}
