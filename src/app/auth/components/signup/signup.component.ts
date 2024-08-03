import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  registerForm!: FormGroup
  showOtpField: boolean = false;
  isLoading = false;

  constructor(private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _toastr: ToastrService,
    private _route: Router) {

  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({

      name: this._formBuilder.control('', Validators.required),
      phone: this._formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      email: this._formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
      password: this._formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
      confirmPassword: this._formBuilder.control('', Validators.compose([Validators.required])),
      otp: ['']

    })
  }


  userId!: String;
  proceedToRegister() {

    const { confirmPassword, ...registerValues } = this.registerForm.value;


    if (!this.showOtpField) {
      if (this.registerForm.valid) {
        console.log("valid")

        this.isLoading = true;
        this._http.post<any>('auth/register', registerValues).subscribe(
          response => {
            this._toastr.success('Registration successful!', 'Success');
            this.userId = response.id;
            this.showOtpField = true;
            this.isLoading = false;
          },
          error => {
            this._toastr.error('Failed', 'Error');
            this.isLoading = false;
          }
        )
      }

    }
    else {
      this.verifyOtp(this.userId);

      this._route.navigate([""])

    }

  }


  verifyOtp(userId: String) {

    const otpValue = this.registerForm.get('otp')?.value;



    if (otpValue) {
      const otpVerificationData = {
        userId: userId,
        otpValue: otpValue
      };

      this._http.post<any>('auth/verify-otp', otpVerificationData).subscribe(
        response => {

          this._toastr.success("verified")
          this._route.navigate(["login"])
        })
    } else {

      this._toastr.error("failed last")
    }
  }







}






