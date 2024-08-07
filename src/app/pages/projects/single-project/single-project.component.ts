import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PartyService } from '../../../core/services/party.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Party, PartyRetrieval, partyMember } from '../../../models/party.model';
import { ToastrService } from 'ngx-toastr';
import { ProjectTask, ProjectTeam } from '../../../models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectroleComponent } from '../edit-projectrole/edit-projectrole.component';
import Swal from 'sweetalert2';
import { Material, ProjectMaterial } from '../../../models/material.model';
import { RecieveMaterialComponent } from '../recieve-material/recieve-material.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/auth.model';
import { getEmail } from '../../../store/auth/auth.selector';
import { UsedMaterialComponent } from '../used-material/used-material.component';
import { AttendanceService } from '../../../core/services/attendance.service';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrl: './single-project.component.scss',

})

export class SingleProjectComponent implements OnInit {


  projectTeamMembers: ProjectTeam[] = [];
  showEmployeeList: boolean = false;
  showAccessModal: boolean = false;
  companyId!: string;
  employees: partyMember[] = [];
  projectId!: string;
  filteredProjectTeamMembers: ProjectTeam[] = [];
  projectMaterials: ProjectMaterial[] = [];
  receivedMaterials: Material[] = [];

  selectedEmployee: partyMember | null = null;
  showRoleSelectionModal: boolean = false;
  selectedProjectRole: string = '';
  searchQuery: string = '';
  currentUserInfo: any;
  partyEmail!: string;
  userRole!: string
  isAdminOrManager: boolean = false;
  projectTasks: any[] = [];
  page: number = 0;
  pageSize: number = 10;
  loading: boolean = false;
  userEmail!: string;


  // task section
  selectedStatus: string = 'All Status'
  filteredTasks: any[] = [];
  taskCounts: { status: string, count: number }[] = [];
  notStartedCount!: number;
  onGoingCount!: number;
  completedCount!: number;


  // attendence
  attendanceList: any[] = [];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private _partyService: PartyService,
    private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _projectService: ProjectService,
    private dialog: MatDialog,
    private _router: Router,
    private _store: Store<AuthState>,
    private _attendanceService: AttendanceService
  ) { }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.companyId = params['companyId'];
      this.projectId = params['projectId'];
    })

    this._store.select(getEmail).subscribe(email => {
      this.userEmail = email ?? '';
    })
    this.fetchProjectTeamMembers();
    this.getProjectMaterials();
    this.loadTasks();
    this.calculateTaskCounts();
    this.filteredTasks = this.projectTasks;
    this.loadAttendanceData(this.currentDate);

    const currentUserInfoString = sessionStorage.getItem('user');
    if (currentUserInfoString !== null) {
      this.currentUserInfo = JSON.parse(currentUserInfoString);
      this.partyEmail = this.currentUserInfo.email;
    } else {
      console.error('Current user information not found in session storage.');
    }

    this.getProjectUserRole();
    this.checkUserRole();



  }

  toggleEmployeeList(): void {
    this.showEmployeeList = !this.showEmployeeList;
  }

  openAccessModal(): void {
    this.showAccessModal = true;
    this._partyService.getAllPartyMembers(this.companyId).subscribe(
      (response: PartyRetrieval[]) => {
        this.employees = []; // Clear the employees array before adding new party members
        response.forEach((response: PartyRetrieval) => {
          if (response && response.partyMembers) {
            this.employees = this.employees.concat(response.partyMembers);
          } else {
            console.error('Invalid response structure');
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }



  closeAccessModal() {
    this.showAccessModal = false;
  }


  addEmployeeToProject(employee: partyMember) {
    this.selectedEmployee = employee;

    this.showRoleSelectionModal = true;

  }


  saveEmployeeToProject(): void {
    if (this.selectedEmployee && this.selectedProjectRole) {
      this._partyService.saveEmployeeToProject(this.projectId, this.selectedEmployee, this.selectedProjectRole).subscribe(
        (response) => {
          this._toastr.success("Employee " + this.selectedEmployee?.name + " added to project");
          this.fetchProjectTeamMembers();
          this.employees = this.employees.filter(emp => emp.id !== this.selectedEmployee?.id);
          this.selectedEmployee = null;
          this.selectedProjectRole = '';
          this.showRoleSelectionModal = false;
        },
        (error) => {
          this._toastr.error("Already Exists in project");
          console.error('Error saving employee to project team:', error);
        }
      );
    } else {
      console.error('Please select an employee and project role');
    }
  }


  cancelAddEmployee(): void {
    this.selectedEmployee = null;
    this.selectedProjectRole = '';
    this.showRoleSelectionModal = false;
  }


  fetchProjectTeamMembers(): void {
    this._projectService.getMembersOfAProject(this.projectId).subscribe(
      (members: ProjectTeam[]) => {
        this.projectTeamMembers = members;
        this.filteredProjectTeamMembers = [...members];
      }
    )
  }


  openEditModal(member: ProjectTeam) {
    const dialogRef = this.dialog.open(EditProjectroleComponent, {
      width: '40%',
      data: {
        member: member,
        projectId: this.projectId
      }
    })

    dialogRef.componentInstance.roleUpdated.subscribe((updatedRole: string) => {
      const index = this.projectTeamMembers.findIndex(m => m.id === member.id);
      if (index != -1) {
        this.projectTeamMembers[index].projectRole = updatedRole;
      }
    });
  }


  removeMember(member: ProjectTeam): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this member from the project team.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmRemoval(member);
      }
    });
  }

  confirmRemoval(member: ProjectTeam) {
    this._projectService.removeMemberFromProject(this.projectId, member.id).subscribe(
      () => {
        this._projectService.showSuccessMessage("Member removed successfully");
        this.projectTeamMembers = this.projectTeamMembers.filter(item => item.id !== member.id);
        this.filteredProjectTeamMembers = this.filteredProjectTeamMembers.filter(item => item.id !== member.id);
      },
      (error) => {
        this._projectService.showErrorMessage("Failed to remove member");
      }
    )
  }

  filterProjectTeamMembers(): void {
    if (!this.searchQuery.trim()) {
      this.filteredProjectTeamMembers = [...this.projectTeamMembers];
    } else {
      this.filteredProjectTeamMembers = this.projectTeamMembers.filter((member) =>
        member.name?.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );
    }
  }

  reciveMaterialDialog(): void {
    const dialogRef = this.dialog.open(RecieveMaterialComponent, {

      data: {
        companyId: this.companyId,
        projectId: this.projectId
      }
    });

    dialogRef.componentInstance.materialReceived.subscribe(() => {
      this.getProjectMaterials();
      this._toastr.success('Material received successfully');
    });


  }

  usedMaterialDialog(materialName: string, materialId: string, event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(UsedMaterialComponent, {
      width: '40%',
      data: {
        materialName: materialName,
        materialId: materialId,
        companyId: this.companyId,
        projectId: this.projectId
      }
    })

    dialogRef.componentInstance.materialUsed.subscribe(() => {
      this.getProjectMaterials();
      this._toastr.success('Material updated successfully');
    });
  }

  getProjectMaterials(): void {
    this._projectService.getProjectMaterials(this.projectId).subscribe(
      (materials) => {
        this.projectMaterials = materials;
      },
      (error) => {
        console.error('Error fetching project materials:', error);
      }
    );
  }

  getProjectUserRole(): void {
    this._projectService.getProjectUserRole(this.projectId, this.partyEmail).subscribe(
      role => {
        this.userRole = role;
        if (this.userRole === 'ADMIN' || this.userRole === 'MANAGER') {
          this.isAdminOrManager = true
        }

      },
      error => {
        console.error('Error fetching user role:', error);
      }
    );
  }


  checkUserRole(): void {

  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: {

        projectId: this.projectId,
        userEmail: this.partyEmail
      }
    })
  }

  loadTasks() {

    this._projectService.getAllProjectTasks(this.projectId, this.userEmail)
      .subscribe(tasks => {

        if (Array.isArray(tasks)) {

          this.projectTasks = this.projectTasks.concat(tasks);
          this.filteredTasks = tasks;
        } else {

          console.error('Received invalid tasks data:', tasks);
        }

      }, error => {
        console.error('Error fetching tasks:', error);

      });


  }


  filterTasks(): void {
    if (this.selectedStatus === 'All Status') {
      this.filteredTasks = this.projectTasks;
    } else {
      this.filteredTasks = this.projectTasks.filter(task => task.taskStatus === this.selectedStatus);
    }
    this.calculateTaskCounts();
  }


  onScroll() {

    const scrollContainer = this.scrollContainer.nativeElement;
    const atBottom = scrollContainer.scrollTop + scrollContainer.clientHeight === scrollContainer.scrollHeight;

    if (atBottom && !this.loading) {
      this.page++;
      this.loadTasks();
    }
  }


  calculateTaskCounts(): void {
    this.notStartedCount = this.filteredTasks.filter(task => task.taskStatus === 'NOT_STARTED').length;
    this.onGoingCount = this.filteredTasks.filter(task => task.taskStatus === 'ONGOING').length;
    this.completedCount = this.filteredTasks.filter(task => task.taskStatus === 'COMPLETED').length;
  }

  showMaterialDetails(material: ProjectMaterial) {
    this._router.navigate(['/projects/material-details'], {
      queryParams: {
        materialId: material.id
      }
    });
  }


  showTaskDetails(task: any) {
    this._router.navigate(['/projects/task-details'], {
      queryParams: {
        taskId: task.id
      }
    })
  }



  currentDate: Date = new Date();

  decreaseDate() {
    const yesterday = new Date(this.currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    this.currentDate = yesterday;
    this.updateEmployeeList();
  }

  increaseDate() {
    const tomorrow = new Date(this.currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow <= new Date()) {
      this.currentDate = tomorrow;
      this.updateEmployeeList();
    }
  }

  isToday(): boolean {
    const today = new Date();
    return this.currentDate.toDateString() === today.toDateString();
  }

  updateEmployeeList() {

  }


  markPresent(attendanceId: string): void {

  }

  markAbsent(attendanceId: string): void {

  }



  loadAttendanceData(date: Date): void {
    this._attendanceService.getAttendanceData(this.companyId, this.projectId, date).subscribe({
      next: (attendanceData) => {
        this.attendanceList = attendanceData;
      },
      error: (error) => {
        console.error('Error fetching attendance data:', error);

      }
    });
  }


  addWorker() {
    this._router.navigate(['/projects/attendence/addworker'], {
      queryParams: {
        projectId: this.projectId,
        companyId: this.companyId
      }
    })
  }

}




