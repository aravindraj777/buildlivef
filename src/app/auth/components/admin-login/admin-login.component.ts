import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState, LoginModel } from '../../../store/auth/auth.model';
import { Store } from '@ngrx/store';
import { loginRequest } from '../../../store/auth/auth.action';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit{

  adminLoginForm!:FormGroup;
  constructor(private _formBuilder:FormBuilder,private _store:Store<AuthState>){}


  ngOnInit(): void {
   this.adminLoginForm = this._formBuilder.group({

      name: this._formBuilder.control('',Validators.required),
      password: this._formBuilder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))

    })
  }

  proceedToLogin(){

    if(this.adminLoginForm.valid){
      const {name , password } = this.adminLoginForm.value;
      const loginData : LoginModel = {name , password};
      this._store.dispatch(loginRequest({login: loginData}));
    }
  }
  


}
