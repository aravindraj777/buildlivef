import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCompanyRoutingModule } from './create-company-routing.module';
import { CreateCompanyComponent } from './create-company.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateCompanyComponent
  ],
  imports: [
    CommonModule,
    CreateCompanyRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateCompanyModule { }
