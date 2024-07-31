import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent implements OnInit {

  companyId!: string;


  constructor(private _route: ActivatedRoute,
    private _router: Router) { }
  ngOnInit(): void {

    this._route.params.subscribe(params => {
      this.companyId = params['id']
    })



  }


  navigateToParty(): void {
    this._router.navigate(['/company/party', this.companyId])
  }


  navigateToEmployees(): void {
    this._router.navigate(['/company/company-employee', this.companyId])
  }


  navigateToProjects() {
    this._router.navigate(['/projects/view-all', this.companyId])
  }


  navigateToWorkForce() {
    this._router.navigate(["/company/workforce", this.companyId])
  }

  navigateToMaterials() {
    this._router.navigate(['/company/comapany-materials', this.companyId])
  }

  navigateToMessage() {
    this._router.navigate(['/company/company-chats', this.companyId])
  }




}
