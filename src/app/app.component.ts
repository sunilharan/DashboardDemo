import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,
    private storageService: StorageService) {
      this.init();
  }

  init() {
    this.platform.ready().then(()=>{
      this.storageService.initStorage();
    })
  }
}
