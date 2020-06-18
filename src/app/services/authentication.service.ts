import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }


  /**
   * Registro usuario en Firebase
   * @param {String} email Correo
   * @param {String} password Contraseña
   * @return {Promise}
   */
  registerUser(email: string, password: string) {
    console.log(`servicio( ${email} + ${password} )`);
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(
          res => resolve(res),
          err => reject(console.error(err)))
    })
  }
}
