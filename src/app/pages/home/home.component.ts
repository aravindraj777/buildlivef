import { ViewportScroller } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private _router:Router,
              private viewportScroller:ViewportScroller,
              private elementRef:ElementRef
  ){

  }

  homeImage:String = "/assets/home-three.jpg"
  chatImage:String = "/assets/chatimage.jpg"
  taskimage:String = "/assets/taskimg.jpg"
  collaborationImg:String = "/assets/collaboration-team.jpg"
  financeImg:String="/assets/finance.jpg"


  navigateToLogin(){
    this._router.navigate(["login"]);
}

scrollToServices() {
  const element = this.elementRef.nativeElement.querySelector('#services');
  this.viewportScroller.scrollToAnchor(element.id);
}

}
