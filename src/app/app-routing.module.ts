import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UserComponent } from './layout/user/user.component';
import { UsernavComponent } from './layout/usernav/usernav.component';
import { CompanyComponent } from './pages/company/company.component';
import { AdminSidebarComponent } from './shared/components/admin-sidebar/admin-sidebar.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminSignupComponent } from './auth/components/admin-signup/admin-signup.component';
import { AdminLoginComponent } from './auth/components/admin-login/admin-login.component';


const routes: Routes = [
  {path:"",
  loadChildren : ()=> import('./pages/home/home/home.module')
  .then(module => module.HomeModule)
  },

  {path:"login",component:LoginComponent},
  {path:"register",component:SignupComponent},
  {path:"admin/login",component:AdminLoginComponent},
  {path:"admin/register",component:AdminSignupComponent},
  {path:"sidebar",component:SidebarComponent},
  {path:"navbar",component:NavbarComponent},
  {path:"admin-side",component:AdminSidebarComponent},
  // {path:"user",component:UserComponent},
  {path:"usernav",component:UsernavComponent},
  {path: 'profile',component:UserComponent, 
  loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'company',component:UserComponent, loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule) },
  { path: 'edituser', loadChildren: () => import('./pages/edituser/edituser.module').then(m => m.EdituserModule) },
  { path: 'other-companies',component:UserComponent, loadChildren: () => import('./pages/other-companies/other-companies.module').then(m => m.OtherCompaniesModule) },
  { path: 'projects',component:UserComponent, loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule) },

  {path:'admin',component:AdminComponent,
    children: [
      {path:'dashboard',component:AdminDashboardComponent}
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
