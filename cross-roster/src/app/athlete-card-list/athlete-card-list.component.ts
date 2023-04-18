import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Athlete} from "../models/athlete";
import {MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig} from "@angular/material/legacy-dialog";
import {EditAthleteDialogComponent} from "../edit-athlete-dialog/edit-athlete-dialog.component";
import {AthletesService} from "../services/athletes.service";
import {catchError, tap, throwError} from "rxjs";
import {UserService} from "../services/user.service";

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
              private athletesService:AthletesService,
              public user: UserService) {

  }

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

  getYear(gradYear: number): string {
    let currentYear = new Date().getFullYear();
    if (gradYear - currentYear === 1) {
      return 'Senior';
    } else if (gradYear - currentYear === 2) {
      return 'Junior';
    } else if (gradYear - currentYear === 3) {
      return 'Sophomore';
    } else {
      return 'Freshman'
    }
  }
}
