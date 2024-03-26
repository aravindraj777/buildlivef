import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.model';
import { getEmail } from '../../store/auth/auth.selector';
import { Company } from '../../models/company.mode';
import { OtherCompanyService } from '../../core/services/other-company.service';

@Component({
  selector: 'app-other-companies',
  templateUrl: './other-companies.component.html',
  styleUrl: './other-companies.component.scss'
})
export class OtherCompaniesComponent implements OnInit{

  userEmail:string | undefined ;
  otherCompanies : Company[] = []

  constructor(private _store:Store<AuthState>,
              private _otherCompanyService:OtherCompanyService){}

  ngOnInit(): void {
    this._store.select(getEmail).subscribe((email)=>{
        this.userEmail = email;
        console.log(this.userEmail+"emil coming");
    });

    this.getOtherCompanies();
  }

  trackByFn(index:number,item:Company):string{
    return item.id;
  }

  getOtherCompanies():void{
      if(this.userEmail){
        this._otherCompanyService.getOtherCompaniesOfUser(this.userEmail)
        .subscribe({
          next:(otherCompanies:Company[])=>{
            this.otherCompanies = otherCompanies;
          },
          error:(error)=>{
            console.log(error);
          }
        })
      }
  }


}
