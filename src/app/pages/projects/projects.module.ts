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
import { RecieveMaterialComponent } from './recieve-material/recieve-material.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UsedMaterialsComponent } from './used-materials/used-materials.component';
import { MaterialEntryDetailsComponent } from './material-entry-details/material-entry-details.component';
import { UsedMaterialComponent } from './used-material/used-material.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AttendenceAddingComponent } from './attendence-adding/attendence-adding.component';
import { ChangeStatusComponent } from './change-status/change-status.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    AllProjectsComponent,
    CreateProjectComponent,
    EditProjectroleComponent,
    SearchTeamComponent,
    RecieveMaterialComponent,
    CreateTaskComponent,
    UsedMaterialsComponent,
    MaterialEntryDetailsComponent,
    UsedMaterialComponent,
    TaskDetailsComponent,
    AttendenceAddingComponent,
    ChangeStatusComponent
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
