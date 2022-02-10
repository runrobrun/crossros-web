import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Athlete} from "../models/athlete";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditAthleteDialogComponent} from "../edit-athlete-dialog/edit-athlete-dialog.component";

@Component({
  selector: 'app-athlete-card-list',
  templateUrl: './athlete-card-list.component.html',
  styleUrls: ['./athlete-card-list.component.scss']
})
export class AthleteCardListComponent implements OnInit {

  @Input()
  athletes: Athlete[] | null | undefined;

  @Output()
  athleteEdited = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editAthlete(athlete: Athlete): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';

    dialogConfig.data = athlete;

    this.dialog
      .open(EditAthleteDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.athleteEdited.emit();
        }
      });
  }
}
