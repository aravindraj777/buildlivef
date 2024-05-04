import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.action';
import { AuthState } from '../../store/auth/auth.model';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrl: './usernav.component.scss'
})
export class UsernavComponent {
  isDropdownOpen = false;

  constructor(private store:Store<AuthState>){

  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(logout())
  }

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
