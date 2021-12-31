import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDashboardPage } from './add-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AddDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDashboardPageRoutingModule {}
