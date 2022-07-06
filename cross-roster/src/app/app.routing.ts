import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {CreateAthleteComponent} from "./create-athlete/create-athlete.component";
import {LoginComponent} from "./login/login.component";
import {ViewAthleteComponent} from "./view-athlete/view-athlete.component";
import {AthleteResolver} from "./services/athlete.resolver";
import {CreateUserComponent} from "./create-user/create-user.component";
import {AngularFireAuthGuard, hasCustomClaim} from "@angular/fire/compat/auth-guard";
import {CreateSeasonComponent} from "./create-season/create-season.component";
import {CreateMeetComponent} from "./create-meet/create-meet.component";
import {MeetsComponent} from "./meets/meets.component";
import {ViewMeetComponent} from "./view-meet/view-meet.component";
import {CreateResultComponent} from "./create-result/create-result.component";
import {SeasonComponent} from "./season/season.component";
import {SeasonResolver} from "./services/season.resolver";
import {AboutComponent} from "./about/about.component";
const adminOnly = () => hasCustomClaim("admin");

export const AppRoutes: Routes = [
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
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: adminOnly
    }
  },
  {
    path: 'create-season',
    component: CreateSeasonComponent
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
    path: `seasons/:seasonYear`,
    component: SeasonComponent,
    resolve: {
      season: SeasonResolver,
    },
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
