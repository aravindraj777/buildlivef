import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserPlansComponent } from '../../shared/components/user-plans/user-plans.component';
import { UserPostComponent } from './user-post/user-post.component';

const routes: Routes = [{ path: '', component: ProfileComponent },
  {path:"user-dashboard",component:UserDashboardComponent},
  {path:"user-plans",component:UserPlansComponent},
  {path:"user-post", component:UserPostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
