import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyDto } from '../../../models/party.model';
import { PartyService } from '../../../core/services/party.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrl: './create-party.component.scss'
})
export class CreatePartyComponent implements OnInit {


  partyForm!: FormGroup;
  companyId!:string;

  constructor(private _route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _partyService: PartyService,
              private _toastr: ToastrService,
              private _router: Router){}



  ngOnInit(): void {
   this._route.params.subscribe(params => {
    this.companyId = params['id']
   })
   console.log(this.companyId,"in create party");
   

   this.partyForm = this._formBuilder.group({
    party_name:  ['', Validators.required],
    party_phone: ['', Validators.required],
    party_email: ['', Validators.required],
    partyType :  ['VENDOR', Validators.required]
   })

  }


  createParty():void{

    if(this.partyForm.invalid){
      return;
    }

    else{
      const partyData:PartyDto = {
        party_name  : this.partyForm.value.party_name,
        party_phone : this.partyForm.value.party_phone,
        party_email : this.partyForm.value.party_email,
        partyType   : this.partyForm.value.partyType
      };

      this._partyService.createParty(this.companyId,partyData).subscribe(
        (response) => {
            this._toastr.success("Created",response.message);
            this._router.navigate(["/company/party/",this.companyId])
        },
        error =>{
          console.error("Failed");
          
        }
      )
    }

  }



}
