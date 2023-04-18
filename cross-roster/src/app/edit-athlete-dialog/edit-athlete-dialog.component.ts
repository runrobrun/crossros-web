import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Athlete} from "../models/athlete";
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {AthletesService} from "../services/athletes.service";
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import {catchError, concatMap, last, Observable, tap, throwError} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-edit-athlete-dialog',
  templateUrl: './edit-athlete-dialog.component.html',
  styleUrls: ['./edit-athlete-dialog.component.scss']
})
export class EditAthleteDialogComponent implements OnInit {
  form: UntypedFormGroup;
  athlete: Athlete;
  public percentageChanges$: Observable<number | undefined>;
  public profileEditImageUrl: String;

  constructor(
    private dialogRef: MatDialogRef<EditAthleteDialogComponent>,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) athlete: Athlete,
    private athletesService: AthletesService,
    private storage: AngularFireStorage
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
      profileImageUrl: athlete.profileImageUrl,
      tshirtSize: athlete.tshirtSize,
      isTeamLeader: athlete.isTeamLeader,
      teamLeader: athlete.teamLeader,
      isPhysicalCurrent: athlete.isPhysicalCurrent,
      physicalExpiryDate: athlete.physicalExpiryDate.toDate(),
      bio: athlete.bio,
      notes: athlete.notes,
    });
  }

  ngOnInit(): void {
    this.profileEditImageUrl = this.athlete.profileImageUrl
  }

  close(): void {
    this.dialogRef.close()
  }

  uploadThumbnail(event: Event) {
    const file: File = (<HTMLInputElement>event.target).files[0];
    const filePath = `athletes/${this.athlete.id}/${file.name}`;
    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });
    this.percentageChanges$ = task.percentageChanges();
    task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL()),
        tap((url) => {this.athlete.profileImageUrl = url as string;
                              this.profileEditImageUrl = url as string}),
        catchError(err => {
          console.log(err);
          alert('Could not create thumbnail url');
          return throwError(err);
        })
      )
      .subscribe();
  }

  save(): void {
    this.form.value.physicalExpiryDate = Timestamp.fromDate(this.form.value.physicalExpiryDate);
    this.form.value.profileImageUrl = this.athlete.profileImageUrl;
    const changes = this.form.value;
    this.athletesService.updateAthlete(this.athlete.id, changes).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }
}
