import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnCEFqnF15WOwueCrsEUBfd8gACOTkmOg",
  authDomain: "xc-roster-manager.firebaseapp.com",
  databaseURL: "https://xc-roster-manager.firebaseio.com",
  projectId: "xc-roster-manager",
  storageBucket: "xc-roster-manager.appspot.com",
  messagingSenderId: "136786443589",
  appId: "1:136786443589:web:f1ad366e45775bed0d922c",
  measurementId: "G-VX8R78XYDQ"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
