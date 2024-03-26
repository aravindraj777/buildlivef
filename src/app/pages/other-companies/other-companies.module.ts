import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherCompaniesRoutingModule } from './other-companies-routing.module';
import { OtherCompaniesComponent } from './other-companies.component';


@NgModule({
  declarations: [
    OtherCompaniesComponent
  ],
  imports: [
    CommonModule,
    OtherCompaniesRoutingModule
  ]
})
export class OtherCompaniesModule { }
