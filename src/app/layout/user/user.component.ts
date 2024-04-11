import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  isLargeScreen: boolean = true; // Assuming it's initially true

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update isLargeScreen based on the screen width
    this.isLargeScreen = window.innerWidth >= 768; // Adjust the threshold as needed
  }

}
