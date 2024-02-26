import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:"",
  loadChildren : ()=> import('./pages/home/home/home.module')
  .then(module => module.HomeModule)
  },

  {path:"login",component:LoginComponent},
  {path:"register",component:SignupComponent},
  {path:"sidebar",component:SidebarComponent},
  {path:"navbar",component:NavbarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
