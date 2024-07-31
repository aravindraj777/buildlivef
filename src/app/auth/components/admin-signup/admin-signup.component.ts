import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../core/services/admin.service';
import { AdminVerifiation } from '../../../models/auth.model';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrl: './admin-signup.component.scss'
})
export class AdminSignupComponent implements OnInit {

  adminSignupForm!: FormGroup;
  showOtpField: boolean = false;
  userId!: string;

  constructor(private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _toastr: ToastrService,
    private _router: Router,
    private _adminService: AdminService
  ) { }


  ngOnInit(): void {
    this.adminSignupForm = this._formBuilder.group({

      name: this._formBuilder.control('', Validators.required),
      phone: this._formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      email: this._formBuilder.control('', Validators.compose([Validators.required, Validators.email])),
      password: this._formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
      confirmPassword: this._formBuilder.control('', Validators.compose([Validators.required])),
      otp: ['']

    })
  }

  submitAdminSignup(): void {


    if (!this.showOtpField) {
      if (this.adminSignupForm.valid) {
        this._adminService.adminSignup(this.adminSignupForm.value).subscribe({
          next: (response) => {
            this._toastr.success("Succesfully registerd")
            this.showOtpField = true;
            this.userId = response.id;

          },
          error: (error) => {
            this._toastr.error("Failed to regiseter", error)
          }
        })
      }
    }
    else {
      this.verifyOtp(this.userId);


    }


  }

  verifyOtp(userId: string) {

    const otpValue = this.adminSignupForm.get('otp')?.value;

    if (otpValue) {
      const otpVerificationData: AdminVerifiation = {
        userId: userId,
        otpValue: otpValue
      };

      this._adminService.verifyOtp(otpVerificationData).subscribe({
        next: (response) => {
          this._toastr.success('verified', response);
        },
        error: (err) => {
          this._toastr.error(err);
        },
      })
    }
  }




}
