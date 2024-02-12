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
      confirmPassword: this._formBuilder.control('',Validators.compose([Validators.required]))
      
    })
  }

  proceedToRegister(){


      /*
        -Destrucured form contents and obtain the values excluding confirmPassword.
        -confirmPassword is only used for validation purpose in clien-side.
      */
      const {confirmPassword,...registerValues} = this.registerForm.value;
      console.log(registerValues);

      if(this.registerForm.valid){
        console.log("valid")
        
        this._http.post<any>('http://localhost:8080/api/v1/auth/register',registerValues).subscribe(
          response => {
            console.log("registerd",response);
            this._toastr.success('Registration successful!', 'Success');
            this._route.navigate([""]);
          },
          error =>{
            this._toastr.error('Failed','Error');
          }
        )
      }
      else{
        console.log("errror");
        this._toastr.error('Failed','Error');
        
      }
      
  }

}
