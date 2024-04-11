import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { ShowCompanyComponent } from './show-company/show-company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanynavComponent } from './companynav/companynav.component';
import { PartyComponent } from './party/party.component';
import { CreatePartyComponent } from './create-party/create-party.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { CompanyUserProfileComponent } from './company-user-profile/company-user-profile.component';
import { WorkforceComponent } from './workforce/workforce.component';
import { CompanyMaterialsComponent } from './company-materials/company-materials.component';



const routes: Routes = [{ path: '', component: CompanyComponent }, 

{
   path: 'createCompany', 
loadChildren: () => import('../create-company/create-company.module')
.then(m => m.CreateCompanyModule) 

},
{ path: 'company-list', component: ShowCompanyComponent },
{ path: 'company-details/:id' , component: CompanyDetailsComponent},
{ path: 'company-menu',component:CompanynavComponent},
{ path: 'party/:id',component:PartyComponent},
{ path: 'create-party/:id',component:CreatePartyComponent},
{ path: 'company-employee/:id',component:EmployeesListComponent} ,  
{ path: 'company/user-profile/:id',component:CompanyUserProfileComponent},
{ path: 'workforce/:id',component:WorkforceComponent},
{path:  'comapany-materials/:id',component:CompanyMaterialsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
