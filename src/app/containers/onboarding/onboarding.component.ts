import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IActivity } from 'src/app/models/activity.model';
import { IDiaryActivity } from 'src/app/models/diaryActivity.model';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  activityData!:IActivity[]
  groupedSpoons: any[] = [];
  userSelected:any[]=[];


  constructor(private storageService: StorageService,private router: Router){}



  ngOnInit(): void {

    this.activityData = this.storageService.getActivities();

    this.groupSpoonActivities(this.activityData)

  }

  groupSpoonActivities(activities: IActivity[]) {
    activities.forEach((activity) => {
      const spoonCost = activity.spoonCost;

      if (!this.groupedSpoons[spoonCost]) {
        this.groupedSpoons[spoonCost] = [];
      }
      const index = this.groupedSpoons[spoonCost].findIndex(
        (a: any) => a.name === activity.name
      );
      if (index !== -1) {
        this.groupedSpoons[spoonCost][index] = activity;
      } else {
        this.groupedSpoons[spoonCost].push(activity);
      }
    });
  }

  updateUserActivity(activity:IActivity){

 

    const index = this.userSelected.indexOf(activity);



    if (index === -1) {
      this.userSelected.push(activity);
    } else {
      this.userSelected.splice(index,1)
    }


  }

  getTotalSpoons(): number {
    let spoons = 0;
    for (const activity of this.userSelected) {
      spoons += activity.spoonCost;
    }
    return spoons;
  }

  toDashboard(){
    if(this.userSelected.length > 0){

     let mappedData:IDiaryActivity[] = this.userSelected.map((activity:IActivity) =>{
      return {
        activity: activity,
        isCompleted: false, 
      };
     });
      

      let data = {
        activities:mappedData,
        totalSpoons:this.getTotalSpoons()
      };
      this.storageService.set('onboarding',false);
      this.storageService.set('userActivities',JSON.stringify(data));
      
      this.router.navigate(['/app/tabs/dashboard']);
    }


  }

}
