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
    const things = db.collection('athletes').valueChanges();
    things.subscribe(console.log);
  }

  title = 'cross-roster';
  activeSeason: any;

  logout() {
    this.user.logout();
  }
}
