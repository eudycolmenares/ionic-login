import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from "../../services/authentication.service";
import { ValidatorsService } from "../../services/validators.service";
import { MessagesService } from "../../services/messages.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _auth: AuthenticationService,
    private _validator: ValidatorsService,
    private _msg: MessagesService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }
  
  /**
   * Creo formulario reactivo
   */
  createForm() {
    this.forma = this.fb.group({
      mail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]]
    },{
      validators: this._validator.passwordsIguales('password','confirm')
    });
  }
  /**
   * Registar usuario 
   */
  async register() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    } else {
      const resp = await this._auth.registerUser(this.forma.value.mail, this.forma.value.password);
      if (resp) {
        this._msg.msg('You have successfully registered.', 5000);
        this.router.navigate([`/login`]);
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
  get confirmNotValid() {
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('confirm').value;
    return ( pass1 === pass2 ) ? false : true;
  }
}
