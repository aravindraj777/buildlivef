import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  registerForm!:FormGroup
  showOtpField: boolean = false;

  constructor(private _formBuilder:FormBuilder,
              private _authService: AuthService,
              private _http: HttpClient,
              private _toastr:ToastrService,
              private _route:Router){

  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({

      name:  this._formBuilder.control('',Validators.required),
      phone: this._formBuilder.control('', Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
      email: this._formBuilder.control('',Validators.compose([Validators.required,Validators.email])),
      password: this._formBuilder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
      confirmPassword: this._formBuilder.control('',Validators.compose([Validators.required])),
      otp: ['']
      
    })
  }

  
   userId!:String;
   proceedToRegister(){


      /*
        -Destrucured form contents and obtain the values excluding confirmPassword.
        -confirmPassword is only used for validation purpose in clien-side.
      */
      const {confirmPassword,...registerValues} = this.registerForm.value;
      console.log(registerValues);

    if(!this.showOtpField){
      if(this.registerForm.valid){
        console.log("valid")
        
        this._http.post<any>('auth/register',registerValues).subscribe(
          response => {
            console.log("registerd",response);
            this._toastr.success('Registration successful!', 'Success');
            this.userId = response.id;
            console.log(this.userId)
            this.showOtpField = true;
         
           
            // this._route.navigate([""]);
          },
          error =>{
            this._toastr.error('Failed','Error');
          }
        )
      }
      
    }
    else{
      this.verifyOtp(this.userId);
      console.log("errror");
      // this._toastr.error('Failed','Error');
      this._route.navigate([""])
      
    }
      
  }


  verifyOtp(userId:String){

    const otpValue = this.registerForm.get('otp')?.value;
    console.log(otpValue);
    console.log(this.userId);
    

    if (otpValue) {
      const otpVerificationData = {
        userId: userId,
        otpValue: otpValue
      };
  
      this._http.post<any>('auth/verify-otp', otpVerificationData).subscribe(
        response => {
          console.log("OTP verified", response);
          // Handle successful OTP verification here
          this._toastr.success("verified")
          this._route.navigate([""])
        }) 
    } else {
      console.error("OTP value is not available");
      this._toastr.error("failed last")
    }
  }




  
  

}






