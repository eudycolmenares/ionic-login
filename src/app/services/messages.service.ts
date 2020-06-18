import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  constructor(
    private toastController: ToastController
  ) { }

  /**
   * Presenta mensaje tipo Toast
   * @param {String} message Texto mostrar al usuario
   * @param {Number} time Tiempo que durara el toast
   */
  async msg(message: string, time = 3000) {
    const toast = await this.toastController.create({
      message: message,
      duration: time,
      position: 'top',
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });
    toast.present();
  }
}
