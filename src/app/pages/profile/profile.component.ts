import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState, User } from '../../store/auth/auth.model';
import { getUserId, selectLoggedInUser } from '../../store/auth/auth.selector';
import { loginSuccess } from '../../store/auth/auth.action';
import { MatDialog } from '@angular/material/dialog';
import { EdituserComponent } from '../edituser/edituser.component';
import { UserAuthService } from '../../core/services/user-auth.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{





  loggedInUser$!:Observable<User | null>
  profileImage: any;
  imageFile!:File;
  userId$!: Observable<string | undefined>;
  userId!:string | undefined ;
  userPhotoUrl: string | null = null;

  constructor(private _store:Store<AuthState>,
             private _dialog:MatDialog ,
            private _userAuthService:UserAuthService,
            private _route:Router){

  }



  ngOnInit(): void {
   this.loggedInUser$ = this._store.select(selectLoggedInUser);
   this.userId$ = this._store.pipe(select(getUserId));

   this.userId$.subscribe(userId => {
    this.userId = userId;
    console.log(userId,"uususu");
    
   })
   this.getUserPhoto();
   
  }

  editUser(user:User){
    this._dialog.open(EdituserComponent,{
      data:user
    })
  }


  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if(file){
      this.imageFile = file;
    };
    this._userAuthService.updateProfileImage(this.userId,this.imageFile).subscribe(
      (data)=>{
        this._route.navigate(['/profile']).then(()=>{
          window.location.reload();
        })
      }
    )
  }

  getUserPhoto(){
      this._userAuthService.getUserPhoto(this.userId).subscribe(photoUrl=>{
        this.userPhotoUrl = photoUrl;
        console.log(this.userPhotoUrl);
        
      },error => {
        console.log("Error fetching image",error);
        
      })
      
  }

      

}
