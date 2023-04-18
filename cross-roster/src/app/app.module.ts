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
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import { HomeComponent } from './home/home.component';
import {MatLegacyTabsModule as MatTabsModule} from "@angular/material/legacy-tabs";
import { AboutComponent } from './about/about.component';
import { AthleteCardListComponent } from './athlete-card-list/athlete-card-list.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {environment} from "../environments/environment";
import { CreateAthleteComponent } from './create-athlete/create-athlete.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import { AppRoutes } from './app.routing';
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatCommonModule, MatNativeDateModule} from '@angular/material/core';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { EditAthleteDialogComponent } from './edit-athlete-dialog/edit-athlete-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import { ViewAthleteComponent } from './view-athlete/view-athlete.component';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from "@angular/material/legacy-progress-spinner";
import { CreateResultComponent } from './create-result/create-result.component';
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import { LoginComponent } from './login/login.component';
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MatLegacyProgressBarModule as MatProgressBarModule} from "@angular/material/legacy-progress-bar";
import { CreateMeetComponent } from './create-meet/create-meet.component';
import { MeetsComponent } from './meets/meets.component';
import { MeetsCardListComponent } from './meets-card-list/meets-card-list.component';
import { EditMeetDialogComponent } from './edit-meet-dialog/edit-meet-dialog.component';
import { ViewMeetComponent } from './view-meet/view-meet.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SeasonComponent } from './season/season.component';
import { CreateSeasonComponent } from './create-season/create-season.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AthleteListViewComponent } from './athlete-list-view/athlete-list-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AthleteCardListComponent,
    CreateAthleteComponent,
    EditAthleteDialogComponent,
    ViewAthleteComponent,
    CreateResultComponent,
    LoginComponent,
    CreateMeetComponent,
    MeetsComponent,
    MeetsCardListComponent,
    EditMeetDialogComponent,
    ViewMeetComponent,
    CreateUserComponent,
    SeasonComponent,
    CreateSeasonComponent,
    AthleteListViewComponent

  ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        MatCommonModule,
        MatNativeDateModule,
        RouterModule.forRoot(AppRoutes),
        AngularFireStorageModule, BrowserAnimationsModule, MatSidenavModule, RouterModule, MatIconModule, MatListModule, MatToolbarModule, MatButtonModule, MatTabsModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatDatepickerModule, MatDialogModule, MatProgressSpinnerModule, MatTableModule, MaterialFileInputModule, MatProgressBarModule, MatButtonToggleModule, // storage
    ],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost', 9099] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8008] : undefined }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
