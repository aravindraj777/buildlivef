import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompanyComponent } from './create-company.component';

const routes: Routes = [{ path: '', component: CreateCompanyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCompanyRoutingModule { }
