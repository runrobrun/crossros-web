import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule, USE_EMULATOR as USE__STORAGE_EMULATOR} from '@angular/fire/compat/storage';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
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
import { AboutComponent } from './about/about.component';
import { AthleteCardListComponent } from './athlete-card-list/athlete-card-list.component';
import {MatCardModule} from "@angular/material/card";
import {environment} from "../environments/environment";
import { CreateAthleteComponent } from './create-athlete/create-athlete.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCommonModule, MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { EditAthleteDialogComponent } from './edit-athlete-dialog/edit-athlete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ViewAthleteComponent } from './view-athlete/view-athlete.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AthleteCardListComponent,
    CreateAthleteComponent,
    EditAthleteDialogComponent,
    ViewAthleteComponent
  ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AppRoutingModule,
        MatCommonModule,
        MatNativeDateModule,
        AngularFireStorageModule, BrowserAnimationsModule, MatSidenavModule, RouterModule, MatIconModule, MatListModule, MatToolbarModule, MatButtonModule, MatTabsModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatDatepickerModule, MatDialogModule, MatProgressSpinnerModule, // storage
    ],
  providers: [
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8008] : undefined }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
