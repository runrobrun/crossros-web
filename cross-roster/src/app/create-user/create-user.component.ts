import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    admin: [false]
  })

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
  }

  onCreateUser() {
    const user = this.form.value;

    console.log(user);
  }

}
