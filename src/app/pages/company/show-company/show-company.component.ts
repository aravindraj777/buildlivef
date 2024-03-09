import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../core/services/company.service';
import { AuthState } from '../../../store/auth/auth.model';
import { Store } from '@ngrx/store';
import { getUserId } from '../../../store/auth/auth.selector';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrl: './show-company.component.scss'
})
export class ShowCompanyComponent implements OnInit {

  userId:string | undefined ;
  companies: any[] = [];
  constructor(private _companyService:CompanyService,
    private _store:Store<AuthState>){}
  ngOnInit(): void {
   
    this._store.select(getUserId).subscribe((data)=>{
      this.userId =  data;
      console.log(this.userId,"userIdddd")
   })
   this.getAllCompanies()

  }

  getAllCompanies(){
    if(this.userId){
      this._companyService.getAllCompaniesOfUser(this.userId).subscribe(
        (data:any[]) =>{
          this.companies = data;
        },
        (error)=>{
          console.log(error);
          
        }
      )
    }
   
  }

}
