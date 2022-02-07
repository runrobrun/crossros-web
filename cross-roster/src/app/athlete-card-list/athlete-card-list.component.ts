import {Component, Input, OnInit} from '@angular/core';
import {Athlete} from "../models/athlete";

@Component({
  selector: 'app-athlete-card-list',
  templateUrl: './athlete-card-list.component.html',
  styleUrls: ['./athlete-card-list.component.scss']
})
export class AthleteCardListComponent implements OnInit {

  @Input()
  athletes: Athlete[] | null | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
