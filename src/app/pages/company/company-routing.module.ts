import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { ShowCompanyComponent } from './show-company/show-company.component';



const routes: Routes = [{ path: '', component: CompanyComponent }, 

{
   path: 'createCompany', 
loadChildren: () => import('../create-company/create-company.module')
.then(m => m.CreateCompanyModule) 

},
{ path: 'company-list', component: ShowCompanyComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
