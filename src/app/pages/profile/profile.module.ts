import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { UserPlansComponent } from '../../shared/components/user-plans/user-plans.component';
import { UserPostComponent } from './user-post/user-post.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileComponent,
    UserDashboardComponent,
    UserPlansComponent,
    UserPostComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CanvasJSAngularChartsModule,
    ReactiveFormsModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule { }
