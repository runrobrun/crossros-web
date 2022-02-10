import { Component, OnInit } from '@angular/core';
import {Athlete} from "../models/athlete";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-athlete',
  templateUrl: './view-athlete.component.html',
  styleUrls: ['./view-athlete.component.scss']
})
export class ViewAthleteComponent implements OnInit {
  athlete: Athlete;
  loading: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.athlete = this.route.snapshot.data.athlete;
    this.loading = true;

  }

}
