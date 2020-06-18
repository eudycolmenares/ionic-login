import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';

import { StateService } from "./services/state.service";
import { UserModel } from './interfaces/interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  subscriptions: Subscription[] = [];
  userData: UserModel;
  dsbMenu: boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _state: StateService,
    
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  /**
   * Inicializa aplicacion
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this._state.checkStorage();
      /**
       * Subscribimos informacion del usuario
       */
      this.subscriptions.push(this._state.authenticationState$.subscribe(user => {
        this.userData = user;
        this.dsbMenu = (this.userData === null);
      }));

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  /**
   * Cerrar sesion usuario 
   */
  logout () {
    this._state.logout();
  }
  /**
   * Evento Destroy componente
   */
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
