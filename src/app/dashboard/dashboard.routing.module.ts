import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { NobelPrizeDetailComponent } from './components/nobel-prize-detail/nobel-prize-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'premios-nobel/:category/:awardYear',
    component: NobelPrizeDetailComponent,

    runGuardsAndResolvers: 'always'
},
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
