import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { MessagesService } from "../services/messages.service";
import { LoaderService } from "../services/loader.service";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth,
    private _msg: MessagesService,
    private _loader: LoaderService
  ) { }

  /**
   * Registro usuario en Firebase
   * @param {String} email Correo
   * @param {String} password Contraseña
   * @return {Promise}
   */
  async registerUser(email: string, password: string) {
    this._loader.show();
    let resp = null;
    try {
      resp = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this._loader.hide();
    } catch (error) {
      this._loader.hide();
      this._msg.msg('A problem has occurred, please try again.');
    }
    return resp;
  }
  /**
   * Login en firebase
   * @param value 
   */
  async loginUser(email: string, password: string) {
    this._loader.show();
    let resp = null;
    try {
      resp = await this.afAuth.signInWithEmailAndPassword(email, password)
      this._loader.hide();
    } catch (error) {
      this._loader.hide();
      this._msg.msg(error.message);
    }
    return resp;
  }
  /**
   * Logout en Firebase
   */
  logoutUser() {
    console.log('Logout en firebase()');
    if (this.afAuth.currentUser) {
      this.afAuth.signOut()
        .then(() => {
          console.log("LOG Out FB");
        }).catch((error) => {
        });
    }
  }
}
