import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private db: AngularFirestore,
              public user: UserService) {
  }
  public uid = this.user.userId$.subscribe((results) => this.uid = results)
  title = 'cross-roster';
  activeSeason: any;

  logout() {
    this.user.logout();
  }
}
