import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { ShowCompanyComponent } from './show-company/show-company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanynavComponent } from './companynav/companynav.component';
import { PartyComponent } from './party/party.component';
import { CreatePartyComponent } from './create-party/create-party.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { CompanyUserProfileComponent } from './company-user-profile/company-user-profile.component';
import { WorkforceComponent } from './workforce/workforce.component';
import { CreateWorkforceComponent } from './create-workforce/create-workforce.component';


@NgModule({
  declarations: [
    CompanyComponent,
    ShowCompanyComponent,
    CompanyDetailsComponent,
    CompanynavComponent,
    PartyComponent,
    CreatePartyComponent,
    EmployeesListComponent,
    CompanyUserProfileComponent,
    WorkforceComponent,
    CreateWorkforceComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CompanyModule { }
