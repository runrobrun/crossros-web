import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {UserService} from "./services/user.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public user: UserService) {
  }
  public uid = this.user.userId$.subscribe((results) => this.uid = results)
  title = 'cross-roster';
  activeSeason: any;
  version: any = environment.version;

  logout() {
    this.user.logout();
  }
}
