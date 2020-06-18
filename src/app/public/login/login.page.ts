import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.forma = this.fb.group({
      mail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.required]
    });
  }
  login() {
    console.log('funcion login()');
    console.log( this.forma );

    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
     
    }
    
  }

  get mailNotValid() {
    return this.forma.get('mail').invalid && this.forma.get('mail').touched
  }
  get passwordNotValid() {
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }
}
