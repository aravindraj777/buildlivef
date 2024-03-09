import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../home.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    
  ]
})
export class HomeModule { }
