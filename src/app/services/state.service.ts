import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { UserModel } from "../interfaces/interface";
import { StorageService } from "../services/storage.service";
import { AuthenticationService } from "../services/authentication.service";
import { LoaderService } from "../services/loader.service";

@Injectable({
  providedIn: 'root'
})

export class StateService {
  authenticationState = new BehaviorSubject<UserModel>(null);
  authenticationState$ = this.authenticationState.asObservable();

  constructor(
    private _stg: StorageService,
    private router: Router,
    private _auth: AuthenticationService,
    private _loader: LoaderService
  ) { }

  /**
	 * Se valida en storage haya informacion usuario,
	 * si si, se asigna al observable de sesion
	 */
  async checkStorage() {
    await this._stg.getData('userApp').then((resp: UserModel) => {
      if (resp) {
        this.setDataUser(resp);
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  /**
   * Inicializamos el observable BehaviorSubject para sesion-login
   */
  login(data) {
    this.setDataUser(data);
  }
  /**
	 * Cierra sesion, borrando data storage y cambiando estado
	 */
  logout() {
    // this._stg.removeData('userApp').then(() => {
    //   // this.setDataUser(null);
    //   // this._auth.logoutUser();
    //   // this._loader.showCustom('Cerrando sesión');
    //   // this.router.navigate(['/']);
    // })
    this.setDataUser(null);
    this._auth.logoutUser();
    this._loader.showCustom('Cerrando sesión');
    this.router.navigate(['/']);
  }
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
  /**
   * Gestiona almacenamiento informacion
   * @param {Object} data Informacion usuario
   */
  setDataUser(data) {
    this.authenticationState.next(data);
    this._stg.setData('userApp', data);
  }
}
