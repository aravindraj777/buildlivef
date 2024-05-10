import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';



@NgModule({
  declarations: [
    ProfileComponent,
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CanvasJSAngularChartsModule
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
