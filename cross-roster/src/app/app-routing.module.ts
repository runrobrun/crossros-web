import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from "./about/about.component";
import {CreateAthleteComponent} from "./create-athlete/create-athlete.component";
import {AthleteResolver} from "./services/athlete.resolver";
import {ViewAthleteComponent} from "./view-athlete/view-athlete.component";
import {CreateResultComponent} from "./create-result/create-result.component";
import {LoginComponent} from "./login/login.component";
import {CreateMeetComponent} from "./create-meet/create-meet.component";
import {MeetsComponent} from "./meets/meets.component";
import {ViewMeetComponent} from "./view-meet/view-meet.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-athlete',
    component: CreateAthleteComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'athletes/:profileUrl',
    component: ViewAthleteComponent,
    resolve: {
      athlete: AthleteResolver,
    },
  },
  {
    path: 'create-meet',
    component: CreateMeetComponent,
  },
  {
    path: 'meets',
    component: MeetsComponent,
  },
  {
    path: 'view-meet/:meetId',
    component: ViewMeetComponent
  },
  {
    path: 'create-result/:id',
    component: CreateResultComponent,
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
