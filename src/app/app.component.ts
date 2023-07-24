import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public platform: Platform, private storageService: StorageService,private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      

      this.toOnboarding();
    });
  }

  async toOnboarding(){
    let onBoarded = await this.storageService.getItem('onboarding')


    
    console.log('val',onBoarded)

    if(onBoarded === null || onBoarded){


      this.router.navigate(['/onboarding']);
    } else {
      this.router.navigate(['/app/tabs/dashboard']);
    }
    
    // .then((res)=>{
    //   console.log('onboard',res);
    //   if (undefined) { 
    //     console.log('not onboarded')
    //     this.router.navigate(['/onboarding']);
    //   }
    // });


    
    
   
  }
}
