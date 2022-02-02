import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {MatTabsModule} from "@angular/material/tabs";

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
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AppRoutingModule,
    AngularFireStorageModule, BrowserAnimationsModule, MatSidenavModule, RouterModule, MatIconModule, MatListModule, MatToolbarModule, MatButtonModule, MatTabsModule, // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
