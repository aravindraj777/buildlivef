import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/auth.model';
import { logout } from '../../../store/auth/auth.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private store:Store<AuthState>,
    private _router:Router
  ){

  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(logout())
  }


  navigateToPost(){
    this._router.navigateByUrl('/profile/user-post')
  }
}
