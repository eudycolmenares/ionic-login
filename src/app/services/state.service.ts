import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserModel } from "../interfaces/interface";

@Injectable({
  providedIn: 'root'
})

export class StateService {
  authenticationState = new BehaviorSubject<UserModel>(null);
  authenticationState$ = this.authenticationState.asObservable();

  constructor() { }

  /**
	 * Retorna informacion usuario del State
	 * @returns {Object} Informacion usuario
	 */
  public get getData() {
    return this.authenticationState.value;
  }
  /**
	 * Retorna true o false depende del state sesion (usado para los guards)
   * @return {Boolean}
	 */
  isAuthenticated() {
    return (this.authenticationState.value) ? true : false;
  }
}
