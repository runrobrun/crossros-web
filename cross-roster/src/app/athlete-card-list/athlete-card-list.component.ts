import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Athlete} from "../models/athlete";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditAthleteDialogComponent} from "../edit-athlete-dialog/edit-athlete-dialog.component";
import {AthletesService} from "../services/athletes.service";
import {catchError, tap, throwError} from "rxjs";

@Component({
  selector: 'app-athlete-card-list',
  templateUrl: './athlete-card-list.component.html',
  styleUrls: ['./athlete-card-list.component.scss']
})
export class AthleteCardListComponent implements OnInit {

  @Input()
  athletes: Athlete[] | null | undefined;

  @Output()
  athleteEdited = new EventEmitter<Athlete>();

  @Output()
  athleteDeleted = new EventEmitter<Athlete>();

  constructor(private dialog: MatDialog,
              private athletesService:AthletesService) { }

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

  onDeleteAthletes(athlete: Athlete) {
    if (confirm(`Are you sure you want to delete athlete ${athlete.firstName} ${athlete.lastName}?`) === true) {
      this.athletesService.deleteAthlete(athlete.id)
        .pipe(
          tap(() => {
            console.log("Deleted athlete: " + athlete.firstName + " " + athlete.lastName);
            this.athleteDeleted.emit(athlete);
          }),
          catchError(err => {
            console.log(err);
            alert('could not delete athlete.');
            return throwError(err);
          })
        )
        .subscribe()

    }
  }
}
