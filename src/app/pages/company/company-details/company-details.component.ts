import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent implements OnInit{
 
   companyId!:string;
 

  constructor(private _route:ActivatedRoute,
              private _router:Router){}
  ngOnInit(): void {
    
    this._route.params.subscribe(params=> {
      this.companyId = params['id']
    })

    console.log(this.companyId,"company id in details");
    
  }


  navigateToParty():void{
      this._router.navigate(['/company/party',this.companyId])
  }

/**
 *
 *
 * @memberof CompanyDetailsComponent
 */
navigateToEmployees():void {
    this._router.navigate(['/company/company-employee',this.companyId])
  }
  
  


}
