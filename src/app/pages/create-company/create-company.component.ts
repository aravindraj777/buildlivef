import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../core/services/company.service';
import { UserAuthService } from '../../core/services/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.model';
import { getUserId } from '../../store/auth/auth.selector';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent implements OnInit{

  companyRegisterForm!:FormGroup;
  userId:string| undefined;

  constructor(private _formBuilder: FormBuilder,
              private _companyService: CompanyService,
              private _userService:UserAuthService,
              private _store:Store<AuthState>,
              private _toaster:ToastrService,
              private _router :Router){}


  ngOnInit(): void {
   this.companyRegisterForm = this._formBuilder.group({
    companyName:this._formBuilder.control('',Validators.required),
    cityName:this._formBuilder.control('',Validators.required),
    address:this._formBuilder.control('',Validators.required),
    phoneNumber: this._formBuilder.control('', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
    GSTNumber:this._formBuilder.control('',Validators.required),
    PANNumber:this._formBuilder.control('',Validators.required)
   });

   
   this._store.select(getUserId).subscribe((data)=>{
      this.userId =  data;
      console.log(this.userId,"userIdddd")
   })
  }

  registerCompany(){
    console.log(this.companyRegisterForm.value);
    
    const request = {
      companyName:this.companyRegisterForm.value.companyName,
      cityName:this.companyRegisterForm.value.cityName,
      address:this.companyRegisterForm.value.address,
      phoneNumber:this.companyRegisterForm.value.phoneNumber,
      GSTNumber:this.companyRegisterForm.value.GSTNumber,
      PANNumber:this.companyRegisterForm.value.PANNumber,
      owner:this.userId
    }
    console.log(request,"regggg");
    
    
    if(this.companyRegisterForm.valid && request !=null){
        this._companyService.createCompany(request).subscribe(
          data => {
            console.log(data,"dataa");
            this._toaster.success('Registration successful!', 'Success');
            this._router.navigate(["/company/company-list"])
          },
          error =>{
            this._toaster.error('Failed to register','Error');
          }
        )
    }
    
  }



}
