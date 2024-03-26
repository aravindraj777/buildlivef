import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherCompaniesComponent } from './other-companies.component';

const routes: Routes = [{ path: '', component: OtherCompaniesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherCompaniesRoutingModule { }
