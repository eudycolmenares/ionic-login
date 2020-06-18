import { Component, OnInit } from '@angular/core';

import { StateService } from "../../services/state.service";
import { UserModel } from "../../interfaces/interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  userData: UserModel;
  message = "";

  constructor(
    private _state: StateService
  ) {
    this.userData = this._state.getData;
    this.message = "Application developed with Ionic Framework, implementing good practices, such as reactive forms, route protection with Guards, state management with observables, Firebase backend service, etc ...";
  }

  ngOnInit() {
  }
}
