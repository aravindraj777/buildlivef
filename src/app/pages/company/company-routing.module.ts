import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { ShowCompanyComponent } from './show-company/show-company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanynavComponent } from './companynav/companynav.component';



const routes: Routes = [{ path: '', component: CompanyComponent }, 

{
   path: 'createCompany', 
loadChildren: () => import('../create-company/create-company.module')
.then(m => m.CreateCompanyModule) 

},
{ path: 'company-list', component: ShowCompanyComponent },
{ path: 'company-details/:id' , component: CompanyDetailsComponent},
{ path : 'company-menu',component:CompanynavComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
