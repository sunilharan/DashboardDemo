import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppHelperService {

  loader: HTMLIonLoadingElement;

  constructor(private alertController: AlertController,
    private loadingController: LoadingController) { }

  async showAlert(header: string, msg: string) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['Ok']
    });
    return alert.present();
  }

  async showLoader(msg: string) {
    this.loader = await this.loadingController.create({
      message: msg,
      backdropDismiss: false
    })
    await this.loader.present();
    return;
  }

  async hideLoader() {
    if(this.loader) {
      await this.loader.dismiss();
      this.loader = null;
    }
    return;
  }
}
