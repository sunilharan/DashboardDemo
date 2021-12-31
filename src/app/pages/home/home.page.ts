import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavOptions } from '@ionic/core';
import { ApiService } from 'src/app/services/api.service';
import { AppHelperService } from 'src/app/services/app-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dashBoardList: any[];
  isLoading: boolean = true;

  constructor(private navController: NavController,
    public apiService: ApiService,
    private appHelper: AppHelperService) {}

  ngOnInit() {
    this.isLoading = true;
  }

  ionViewWillEnter() {
    this.getDashBoardList();
  }

  async getDashBoardList() {
    try {
      this.dashBoardList = await this.apiService.getDashboardList();
      this.isLoading = false;
    } catch (error) {
      let msg = (error && error.message)? error.message: 'Something went wrong to fetch dashboard details';
      this.appHelper.showAlert("Error", msg);
      this.isLoading = false;
    }
  }

  gotoProduct() {
    this.navController.navigateForward('/add-dashboard');
  }

  viewDetails(item) {
    console.log("item", item)
    this.navController.navigateForward(`/products/${item.id}`);
  }
}
