import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EdituserRoutingModule } from './edituser-routing.module';
import { EdituserComponent } from './edituser.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EdituserComponent
  ],
  imports: [
    CommonModule,
    EdituserRoutingModule,
    ReactiveFormsModule
  ]
})
export class EdituserModule { }
