import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { StateService } from "../services/state.service";

@Injectable({
  providedIn: 'root'
})

export class GuestGuard implements CanActivate {

  constructor(
    private _state: StateService,
  ) { }

  canActivate(): boolean {
    return !this._state.isAuthenticated();
  }
}
