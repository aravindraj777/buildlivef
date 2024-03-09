import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthState, UpdateModel, User } from '../../store/auth/auth.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../core/services/user-auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { updateRequest } from '../../store/auth/auth.action';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.scss'
})
export class EdituserComponent {

  user!:User;
  editForm!: FormGroup;
  constructor(@Inject (MAT_DIALOG_DATA) public data :User,
              private _dialogRef:MatDialogRef<EdituserComponent>,
              private _fb:FormBuilder,
              private _userService: UserAuthService,
              private _store:Store<AuthState>,
              private _router:Router,
              private _toastr: ToastrService){


                

      this.editForm = this._fb.group({
        name: [this.data.name, Validators.required],
        email: [this.data.email, [Validators.required, Validators.email]],
        phone:[this.data.phone,[Validators.required]],
        
  })
  }

  // onSaveChanges(){
  //   if(this.editForm.valid){
  //     const userId = this.data.id;
  //     const updatedUserData = this.editForm.value;

  //     this._userService.updateUserDetails(userId,updatedUserData).subscribe(
  //       (response) => {
  //         console.log(response+"respose");
  //         this._toastr.success('Edited successfully!', 'Success')
  //         this._router.navigate(["/profile"])
          
  //       },
  //       (error) => {
  //         console.log('Error updating user details',error);
          
  //       }
  //     );
  //   }
  // }

  // onSaveChanges(){

  // }


  onSaveChanges(){
    if(this.editForm.valid){
      const userId = this.data.id;
      const {name ,email, phone } = this.editForm.value;
      const updateData : UpdateModel = {name , email ,phone};
      this._store.dispatch(updateRequest({userId:userId,update:updateData}));
    }
  }
              
}


