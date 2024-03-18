import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent implements OnInit {

  companyId!:string;

  constructor(private _route:ActivatedRoute){}

  
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.companyId = params['id']
    })
  }


}
