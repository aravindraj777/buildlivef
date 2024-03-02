import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UserComponent } from './layout/user/user.component';
import { UsernavComponent } from './layout/usernav/usernav.component';


const routes: Routes = [
  {path:"",
  loadChildren : ()=> import('./pages/home/home/home.module')
  .then(module => module.HomeModule)
  },

  {path:"login",component:LoginComponent},
  {path:"register",component:SignupComponent},
  {path:"sidebar",component:SidebarComponent},
  {path:"navbar",component:NavbarComponent},
  {path:"user",component:UserComponent},
  {path:"usernav",component:UsernavComponent},
  {path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
