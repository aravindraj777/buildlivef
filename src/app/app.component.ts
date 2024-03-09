import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess } from './store/auth/auth.action';
import { AuthState } from './store/auth/auth.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'buildlivef';


  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.store.dispatch(loginSuccess({ user }));
    }
  }
}
