import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MaterialModule } from '../../material/material.module';
import { EditProjectroleComponent } from './edit-projectrole/edit-projectrole.component';
import { SearchTeamComponent } from './search-team/search-team.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    AllProjectsComponent,
    CreateProjectComponent,
    EditProjectroleComponent,
    SearchTeamComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
    

  ],
 
})
export class ProjectsModule { }
