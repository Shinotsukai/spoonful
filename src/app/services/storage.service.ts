import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivityData } from '../data/baseActivityData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    
  } 

  public set(key: string, value: any) {
    this.storage.set(key, value);
    
  }

  public async getItem(key:string) : Promise<any>{
     return await this.storage.get(key);
  }

  public getActivities(){
    let data = ActivityData;

    return data;
  }

  
}
