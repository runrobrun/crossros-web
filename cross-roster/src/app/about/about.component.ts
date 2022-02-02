import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  onReadDoc() {
    this.db.doc('/athletes/L7eZ8TW3MsjPUjzbwuIE')
      .snapshotChanges()
      .subscribe(snap => {
        console.log(snap.payload.id);
        console.log(snap.payload.data());
      });
  }
}
