import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDashboardPageRoutingModule } from './add-dashboard-routing.module';

import { AddDashboardPage } from './add-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDashboardPageRoutingModule
  ],
  declarations: [AddDashboardPage]
})
export class AddDashboardPageModule {}
