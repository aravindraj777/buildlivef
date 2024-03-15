import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { ShowCompanyComponent } from './show-company/show-company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanynavComponent } from './companynav/companynav.component';


@NgModule({
  declarations: [
    CompanyComponent,
    ShowCompanyComponent,
    CompanyDetailsComponent,
    CompanynavComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
