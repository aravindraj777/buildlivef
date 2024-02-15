import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginModel } from '../../../store/auth/auth.model';
import { loginRequest } from '../../../store/auth/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
 
  
  loginForm!:FormGroup

  constructor(private _formBuilder:FormBuilder,private _store:Store){

  }
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({

      name: this._formBuilder.control('',Validators.required),
      password: this._formBuilder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))

    })
  }

  proceedToLogin(){
    if(this.loginForm.valid){
      const {name , password } = this.loginForm.value;
      const loginData : LoginModel = {name , password};
      this._store.dispatch(loginRequest({login: loginData}));
    }
  }



}
