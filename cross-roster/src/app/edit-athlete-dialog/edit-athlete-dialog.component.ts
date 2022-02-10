import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Athlete} from "../models/athlete";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AthletesService} from "../services/athletes.service";
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-edit-athlete-dialog',
  templateUrl: './edit-athlete-dialog.component.html',
  styleUrls: ['./edit-athlete-dialog.component.scss']
})
export class EditAthleteDialogComponent implements OnInit {
  form: FormGroup;
  athlete: Athlete;

  constructor(
    private dialogRef: MatDialogRef<EditAthleteDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) athlete: Athlete,
    private athletesService: AthletesService
  ) {
    this.athlete = athlete;
    this.form = this.fb.group({
      firstName: athlete.firstName,
      lastName: athlete.lastName,
      gender: athlete.gender,
      gradYear: athlete.gradYear,
      active: athlete.active,
      primaryPhone: athlete.primaryPhone,
      secondaryPhone: athlete.secondaryPhone,
      email: athlete.email,
      uniformBottomSize: athlete.uniformBottomSize,
      uniformTopSize: athlete.uniformTopSize,
      warmUpTopSize: athlete.warmUpTopSize,
      bagNumber: athlete.bagNumber,
      profileUrl: athlete.profileUrl,
      tshirtSize: athlete.tshirtSize,
      isTeamLeader: athlete.isTeamLeader,
      teamLeader: athlete.teamLeader,
      physicalCurrent: athlete.isPhysicalCurrent,
      physicalExpiryDate: athlete.physicalExpiryDate.toDate(),
      bio: athlete.bio,
      notes: athlete.notes,
    });
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close()
  }

  save(): void {
    this.form.value.physicalExpiryDate = Timestamp.fromDate(this.form.value.physicalExpiryDate);
    const changes = this.form.value;
    this.athletesService.updateAthlete(this.athlete.id, changes).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }
}
