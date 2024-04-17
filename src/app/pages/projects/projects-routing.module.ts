import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SingleProjectComponent } from './single-project/single-project.component';
import { MaterialEntryDetailsComponent } from './material-entry-details/material-entry-details.component';

const routes: Routes = [{ path: '', component: ProjectsComponent },

{path: 'view-all/:id',component: AllProjectsComponent},
{path: 'create/:id',component: CreateProjectComponent},
{path: 'single-project/:companyId/:projectId',component:SingleProjectComponent},
{path: 'material-details',component:MaterialEntryDetailsComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
