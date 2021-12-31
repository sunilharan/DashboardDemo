import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DashBoardIndex, DashBoardItems } from 'src/app/models/storage-constants';
import { ApiService } from 'src/app/services/api.service';
import { AppHelperService } from 'src/app/services/app-helper.service';

@Component({
  selector: 'app-add-dashboard',
  templateUrl: './add-dashboard.page.html',
  styleUrls: ['./add-dashboard.page.scss'],
})
export class AddDashboardPage implements OnInit {

  dashboardList: any[];
  dashBoardName: string;
  step: any = 1;

  constructor(public apiService: ApiService,
    private appHelper: AppHelperService,
    private navController: NavController) { }

  ngOnInit() {
    this.getDashBoardData();
  }

  getDashBoardData() {
    this.dashboardList = this.apiService.dashBoardData.map((data)=>{
      data['isSelected'] = false;
      return data;
    });
    console.log("this.dashboardList", this.dashboardList);
  }

  addDashBoard() {
    if(!this.dashBoardName){
      return this.appHelper.showAlert("Alert", "Add Dashboard Name");
    }
    this.step =2;
  }
  isDashBoardItemExist() {
    const data = this.dashboardList.filter((data)=> data.isSelected);
    return (data && data.length>0);
  }

  async saveDashBoardItems() {
    try {
      await this.appHelper.showLoader("Saving details...");
      const latestId = await this.apiService.getDashboardLatestIndex();
      const dashBoardData = this.dashboardList.filter((data)=> data.isSelected);
      let saveInfo = {
        id: latestId,
        name: this.dashBoardName,
        dashboardItems: dashBoardData
      }
      this.apiService.saveDashboardItems(saveInfo, latestId);
      await this.appHelper.hideLoader();
      this.navController.navigateBack('/home');
    } catch (error) {
      await this.appHelper.hideLoader();
      let msg = (error && error.message)? error.message: 'Something went wrong to save dashboard details';
      this.appHelper.showAlert("Error", msg);
    }
  }
}
