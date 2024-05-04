import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ChartjsModule } from '@coreui/angular-chartjs';


@NgModule({
  declarations: [
    ProfileComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ChartjsModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
