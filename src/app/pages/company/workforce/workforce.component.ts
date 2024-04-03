import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workforce',
  templateUrl: './workforce.component.html',
  styleUrl: './workforce.component.scss'
})
export class WorkforceComponent implements OnInit{
  

  companyId!:string;

  constructor(private _route:ActivatedRoute){}

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.companyId = params['id'];
    })

    console.log(this.companyId,"in wf");
    
  }

  

}
