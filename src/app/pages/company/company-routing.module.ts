import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { ShowCompanyComponent } from './show-company/show-company.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanynavComponent } from './companynav/companynav.component';
import { PartyComponent } from './party/party.component';
import { CreatePartyComponent } from './create-party/create-party.component';



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
{ path: 'create-party/:id',component:CreatePartyComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
