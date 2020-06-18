import { Component, OnInit } from '@angular/core';

import { StateService } from "../../services/state.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  constructor(
    private _state: StateService
  ) {
    console.log('Dashboard()');
    console.log(this._state.getData);
  }

  ngOnInit() {
  }
}
