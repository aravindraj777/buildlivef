import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/auth/auth.action';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {

  constructor(private store:Store){

  }


  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(logout())
  }

}
