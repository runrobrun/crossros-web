import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Athlete} from "../models/athlete";
import {AthletesService} from "../services/athletes.service";
import {catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-create-athlete',
  templateUrl: './create-athlete.component.html',
  styleUrls: ['./create-athlete.component.scss']
})
export class CreateAthleteComponent implements OnInit {
  athleteForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    gradYear: ['', Validators.required],
    active: [true],
    primaryPhone: [''],
    secondaryPhone: [''],
    email: [''],
    uniformBottomSize: [''],
    uniformTopSize: [''],
    warmUpTopSize: [''],
    bagNumber: [''],
    profileUrl: [''],
    tshirtSize: [''],
    isTeamLeader: [false],
    teamLeader: [''],
    isPhysicalCurrent: [true],
    physicalExpiryDate: [null],
    bio: [''],
    notes: [''],
  });

  private athleteId: string;

  constructor(private fb: FormBuilder,
              private athletesService: AthletesService,
              private router: Router,
              private afs: AngularFirestore,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.athleteId = this.afs.createId();
  }

  onCreateAthlete() {
    const val = this.athleteForm.value;
    const newAthlete: Partial<Athlete> = {
      firstName: val.firstName,
      lastName: val.lastName,
      gender: val.gender,
      gradYear: val.gradYear,
      active: val.active,
      primaryPhone: val.primaryPhone,
      secondaryPhone: val.secondaryPhone,
      email: val.email,
      uniformBottomSize: val.uniformBottomSize,
      uniformTopSize: val.uniformTopSize,
      warmUpTopSize: val.warmUpTopSize,
      bagNumber: val.bagNumber,
      profileUrl: val.profileUrl,
      tshirtSize: val.tshirtSize,
      isTeamLeader: val.isTeamLeader,
      teamLeader: val.teamLeader,
      isPhysicalCurrent: val.isPhysicalCurrent,
      bio: val.bio,
      notes: val.notes,
    };

    newAthlete.physicalExpiryDate = Timestamp.fromDate(this.athleteForm.value.physicalExpiryDate);
    newAthlete.profileUrl = val.firstName.toLowerCase() + '-' + val.lastName.toLowerCase() + '-' + val.gradYear;

    this.athletesService.createAthlete(newAthlete, this.athleteId)
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/');
        }),
        catchError((err) => {
          console.log(err);
          alert('could not create athlete');
          return throwError(err);
        })
      )
      .subscribe()
  }

  uploadThumbnail(event: Event) {
    const file: File = (<HTMLInputElement>event.target).files[0];
    const filePath = `athletes/${this.athleteId}/${file.name}`;
    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });
    task.snapshotChanges().subscribe();
  }
}
