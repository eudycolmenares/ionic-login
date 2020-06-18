import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from "../../services/authentication.service";
import { MessagesService } from "../../services/messages.service";
import { StateService } from "../../services/state.service";
import { UserModel } from "../../interfaces/interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthenticationService,
    private _msg: MessagesService,
    private router: Router,
    private _state: StateService
  ) {
    this.createForm();
  }

  ngOnInit() { }

  /**
   * Creo formulario reactivo
   */
  createForm() {
    this.forma = this.fb.group({
      mail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    });
  }
  async login() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      console.log('Procede loguear...');
      const resp = await this._auth.loginUser(this.forma.value.mail, this.forma.value.password);
      console.log('Respuesta al login', resp);
      if (resp) {
        const data: UserModel = {
          mail: resp.user.email,
          name: resp.user.displayName,
          photo: resp.user.photoURL,
          phone: resp.user.phoneNumber
        }
        this._state.login(data);
        this._msg.msg('Your data has been validated correctly.', 5000);
        this.router.navigate([`/dashboard`]);
      } else { this.forma.reset() }
    }

  }
  /**
   * Metoddos GET obtener validacion del input y/o mostrar mensaje
   */
  get mailNotValid() {
    return this.forma.get('mail').invalid && this.forma.get('mail').touched
  }
  get passwordNotValid() {
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }
}
