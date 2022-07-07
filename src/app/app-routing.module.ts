import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { StockGridComponent } from './stock-grid/stock-grid.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addcompany', component: AddCompanyComponent },
  { path: 'addstock', component: AddStockComponent },
  { path: 'stocks', component: StockGridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
