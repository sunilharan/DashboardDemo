import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    
   }

   async initStorage() {
    await this.storage.create();
   }

   setItem(key: string, value: any): Promise<any> {
     return this.storage.set(key, value);
   }

   getItem(key: string): Promise<any> {
    return this.storage.get(key);
  }
}
