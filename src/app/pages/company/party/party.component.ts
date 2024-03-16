import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrl: './party.component.scss'
})
export class PartyComponent implements OnInit{

  companyId!:string;

  constructor(private _route:ActivatedRoute){}
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.companyId = params['id'];
    })

    console.log(this.companyId,"in party");
    
  }

  
  
}
