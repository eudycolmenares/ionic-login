import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { StateService } from "../services/state.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private _state: StateService,
    private router: Router
  ) { }
  
  /**
   * Guard valida si usuario logueado en service state
   */
  canActivate(): boolean {
    const currentUser = this._state.getData;
    if (currentUser === null) { 
      this.router.navigate([`/`]); 
      return false;
    }
    return this._state.isAuthenticated();
  }
}