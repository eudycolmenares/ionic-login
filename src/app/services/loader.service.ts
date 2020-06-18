import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  isLoading = false;

  constructor(
    private loadingController: LoadingController
  ) { }

  /**
	 * Crea y presenta el loading,
	 * sin limite de tiempo, mensaje ni otro dato
	 */
  async show() {
    this.isLoading = true;
    await this.loadingController.create({}).then(loadin => {
      loadin.present().then(() => {
        if (!this.isLoading) {
          loadin.dismiss().then(() => { });
        }
      })
    });
  }
  /**
	 * Cierra los loading que se encuentren creados
	 */
  async hide() {
    this.isLoading = false;
    this.loadingController.getTop().then(loader => {
      if (loader != undefined) {
        loader.dismiss();
      }
    });
  }
  /**
   * Presenta loading con tiempo cierre
   * @param msg {String} Mensaje mostrara, opcional
   * @param time {Number} Tiempo cierre, opcional
   */
  async showCustom(msg = "", time = 1000) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: time
    });
    await loading.present();
  }
}
