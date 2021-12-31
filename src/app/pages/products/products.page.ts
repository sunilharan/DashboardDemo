import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppHelperService } from 'src/app/services/app-helper.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  productList: any[];
  isLoading: boolean = true;
  dashBoardId: any;
  dashBoardDetails: any;
  selectedItem: any;
  totalProduct: any;
  
  constructor(private apiService: ApiService,
    private appHelper: AppHelperService,
    private activeRoute: ActivatedRoute) { 
    }

  ngOnInit() {
    this.isLoading = true;
    this.dashBoardId = this.activeRoute.snapshot.params.id;    
    console.log(this.dashBoardId)
    this.getdashBoardDetails();
  }

  async getdashBoardDetails() {
    const data = await this.apiService.getDashboardDetailsById(this.dashBoardId);
    if(data) {
      this.dashBoardDetails = data;
      this.selectedItem = this.dashBoardDetails.dashboardItems[0];
      console.log("this.dashBoardDetails", this.dashBoardDetails);
      this.getProducts();
    }
    // this.isLoading = false;
  }


  async getProducts() {
    try {
      console.log("this.selectedItem", this.selectedItem);
      const products = await this.apiService.getItemInfoOnUrl(this.selectedItem.url);
      this.productList = products;
      this.isLoading = false;
      this.totalProduct = this.productList?.length;
      console.log("products", products);
    } catch (error) {
      let msg = (error && error.message)? error.message: 'Something went wrong to fetch product details';
      this.appHelper.showAlert("Error", msg);
      this.isLoading = false;
    }
  }

  showInfo(item) {
    this.isLoading = true;
    this.selectedItem = item;
    this.getProducts();
  }
}
