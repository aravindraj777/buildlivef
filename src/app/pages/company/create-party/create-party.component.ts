import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyDto, PartyResponse } from '../../../models/party.model';
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

  userSuggestions: any[] = []

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
    partyType :  ['VENDOR', Validators.required],
    companyRole: ['', Validators.required]
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
        partyType   : this.partyForm.value.partyType,
        companyRole : this.partyForm.value.companyRole
      };

      this._partyService.createParty(this.companyId,partyData).subscribe(
        (response:PartyResponse) => {

          if(response.status === 200){
            this._toastr.success("Created",response.message);
            this._router.navigate(["/company/party/",this.companyId])
          }
           
          else if(response.status === 400){
            this._toastr.error(response.message);
          }
        },
        error =>{
          console.error("Failed",error);
          this._toastr.error(error);
        }
      )
    }

  }


  searchUsers(event: any) {
    const email = event?.target?.value ; // Using optional chaining to handle null or undefined event
    if (!email || email.trim() === '') {
        this.userSuggestions = [];
        return;
    }

    this._partyService.getUsersByEmail(email).subscribe(users => {
        this.userSuggestions = users;
    });
}






  selectUser(user: any) {
    this.partyForm.patchValue({
      party_email: user.email
    });
    this.userSuggestions = []; // Clear suggestions
  }



}
