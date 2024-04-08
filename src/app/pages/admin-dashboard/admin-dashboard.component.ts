import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { User } from '../../models/auth.model';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AuthState ,User} from '../../store/auth/auth.model';
import { selectLoggedInUser } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{

  loggedInUser$!:Observable<User| null>

  constructor(private _store:Store<AuthState>,
    private _dialog:MatDialog ){

}

  ngOnInit(): void {
   this.loggedInUser$ = this._store.select(selectLoggedInUser);
   console.log(this.loggedInUser$);
   
   
  }


}
