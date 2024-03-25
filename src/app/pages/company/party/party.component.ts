import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Party, PartyRetrieval, partyMember } from '../../../models/party.model';
import { PartyService } from '../../../core/services/party.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrl: './party.component.scss'
})
export class PartyComponent implements OnInit{

  companyId!:string;
  partyMembers: partyMember[] = [];

  constructor(private _route:ActivatedRoute,
              private _partyService: PartyService){}


  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.companyId = params['id'];
    })

    console.log(this.companyId,"in party");
    
    this.getAllPartyMembers();
  }


  


  getAllPartyMembers(): void {
    this._partyService.getAllPartyMembers(this.companyId).subscribe(
      (response: PartyRetrieval[]) => {
        response.forEach((responseData: PartyRetrieval) => {
          if (responseData && responseData.partyMembers) {
            if (!this.partyMembers) {
              this.partyMembers = responseData.partyMembers;
            } else {
              this.partyMembers = this.partyMembers.concat(responseData.partyMembers);
            }
          } else {
            console.error('Invalid response structure');
          }
        });

        console.log(this.partyMembers);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getUserProfile(email:string){

  }

  
  
}
