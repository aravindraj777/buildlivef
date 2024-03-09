import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState, User } from '../../store/auth/auth.model';
import { selectLoggedInUser } from '../../store/auth/auth.selector';
import { loginSuccess } from '../../store/auth/auth.action';
import { MatDialog } from '@angular/material/dialog';
import { EdituserComponent } from '../edituser/edituser.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  loggedInUser$!:Observable<User | null>

  constructor(private _store:Store<AuthState>,
             private _dialog:MatDialog ){

  }



  ngOnInit(): void {
   this.loggedInUser$ = this._store.select(selectLoggedInUser);
   
  }

  editUser(user:User){
    this._dialog.open(EdituserComponent,{
      data:user
    })
  }

      

}
