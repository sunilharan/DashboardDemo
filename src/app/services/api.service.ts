import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { DashBoardIndex, DashBoardItems } from '../models/storage-constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public readonly dashBoardData = [{
    id: 1,
    name: 'List of products',
    isList: true,
    url: 'https://fakestoreapi.com/products',
    isCategory: false
  }, {
    id: 2,
    name: 'Total Products',
    isList: false,
    url: 'https://fakestoreapi.com/products',
    isCategory: false
  }, {
    id: 3,
    name : 'Total Customers',
    isList: false,
    url: 'https://fakestoreapi.com/users',
    isCategory: false
  }, {
    id: 4,
    name : 'Latest product',
    isList: true,
    url: 'https://fakestoreapi.com/products',
    isCategory: false
  }, {
    id: 5,
    name : 'Display categories',
    isList: true,
    url: 'https://fakestoreapi.com/products/categories',
    isCategory: true
  }
]

  constructor(private http: HttpClient, private storageService: StorageService) { }


  getProducts():  Promise<any> {
    return this.http.get(environment.apiUrl +'products').toPromise();
  }

  getCustomers():  Promise<any> {
    return this.http.get(environment.apiUrl +'users').toPromise();
  }

  getCategories(): Promise<any> {
    return this.http.get(environment.apiUrl +'products/categories').toPromise();
  }

  getItemInfoOnUrl(url: string): Promise<any> {
    return this.http.get(url).toPromise();
  }

  async getDashboardLatestIndex(): Promise<any> {
    const index = await this.storageService.getItem(DashBoardIndex);
    if(index) {
      return index+1;
    }
    return 1;
  }

  async getDashboardList(): Promise<any> {
    return this.storageService.getItem(DashBoardItems);
  }

  async getDashboardDetailsById(id: any): Promise<any> {
    let data = await this.getDashboardList();
    if(data && data.length>0) {
      const dashBoardInfo = data.filter((resp)=> resp.id == id);
      return (dashBoardInfo && dashBoardInfo.length>0)? dashBoardInfo[0] : null;
    }
    return null;
  }

  async saveDashboardItems(dashBoardData, latestId): Promise<any> {
    let saveItemData = [];
    let data = await this.getDashboardList();
    if(data && data.length>0) {
      saveItemData = data;
    }
    saveItemData.push(dashBoardData);
    await this.storageService.setItem(DashBoardItems, saveItemData);
    await this.storageService.setItem(DashBoardIndex, latestId);
    return; 
  }
}
