import { Component, OnInit } from '@angular/core';
import {Meet} from "../models/meet";
import {MeetsService} from "../services/meets.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-meet',
  templateUrl: './view-meet.component.html',
  styleUrls: ['./view-meet.component.scss']
})
export class ViewMeetComponent implements OnInit {
  private meetId: string = this.route.snapshot.paramMap.get('meetId');
  meet$: Observable<any>;
  loading: boolean = false;

  constructor(private  meetsService: MeetsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.meet$ = this.meetsService.getMeetById(this.meetId);
  }

}
