import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Meet} from "../models/meet";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MeetsService} from "../services/meets.service";

@Component({
  selector: 'app-edit-meet-dialog',
  templateUrl: './edit-meet-dialog.component.html',
  styleUrls: ['./edit-meet-dialog.component.scss']
})
export class EditMeetDialogComponent implements OnInit {
  form: UntypedFormGroup;
  meet: Meet;

  constructor(
    private dialogRef: MatDialogRef<EditMeetDialogComponent>,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) meet: Meet,
    private meetsService: MeetsService
  ) {
    this.meet = meet;
    this.form = this.fb.group({
      hostSchool: meet.hostSchool,
      archived: meet.archived,
      meetName: meet.meetName,
      locationUrl: meet.locationUrl,
      address: meet.address,
      city: meet.city,
      state: meet.state,
      zip: meet.zip,
    });
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const changes = this.form.value;

    this.meetsService.updateMeet(this.meet.id, changes).subscribe(() => {
      this.dialogRef.close(changes);
    });
  }

}
