import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './components/dashboard.component';
import { NobelPrizeDetailComponent } from './components/nobel-prize-detail/nobel-prize-detail.component';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  declarations: [DashboardComponent, NobelPrizeDetailComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  exports: [DashboardComponent, NobelPrizeDetailComponent],
})
export class DashboardModule {}
