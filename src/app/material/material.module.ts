import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog"
import {MatButtonModule} from "@angular/material/button"
import {MatDialogContent} from "@angular/material/dialog"
import {MatCardModule} from "@angular/material/card"
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule} from '@angular/material/form-field';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogContent,
    MatCardModule,
    MatFormFieldModule
  ],
  exports:[
    MatTabsModule
  ]
})
export class MaterialModule { }
