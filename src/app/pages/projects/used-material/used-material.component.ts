import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Material } from '../../../models/material.model';
import { partyMember } from '../../../models/party.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../core/services/company.service';
import { PartyService } from '../../../core/services/party.service';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-used-material',
  templateUrl: './used-material.component.html',
  styleUrl: './used-material.component.scss'
})
export class UsedMaterialComponent {

  @Output() materialUsed: EventEmitter<void> = new EventEmitter<void>();

  companyId!:string;
  projectId!:string;
  materialId!:string;
  currentUserInfo: any;
  currentUserEmail!:string;
  usedMaterialForm!: FormGroup;


  constructor(public dialogRef:MatDialogRef<UsedMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{projectId:string,companyId:string,materialId:string,materialName:string},
    private _partyService:PartyService,
    private _companyService:CompanyService,
    private formBuilder: FormBuilder,
    private _projectService:ProjectService,
    private toastr:ToastrService
  ){
      this.companyId = data.companyId;
      this.projectId = data.projectId;
      this.materialId = data.materialId;
      console.log(this.companyId);
      
  }

  ngOnInit(): void {
  
    console.log(this.data.materialName,"llllll");
    
    

    const currentUserInfoString = sessionStorage.getItem('user');

   

    if (currentUserInfoString !== null) {
      // Parse the JSON string to get the user information object
      this.currentUserInfo = JSON.parse(currentUserInfoString);

      // Get the email from the user information
      this.currentUserEmail = this.currentUserInfo.email;
      console.log(this.currentUserEmail,"hghghghghg");
    } else {
      console.error('Current user information not found in session storage.');
    }

    
    this.usedMaterialForm = this.formBuilder.group({
      material: [{ value: this.data.materialName, disabled: true }],
      quantity: ['', [Validators.required,Validators.min(0)]],
      description: [''], 
    });
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  
  onSubmit() {

    const material = this.usedMaterialForm.get('material')?.value;
    const materialId = this.materialId;
    const userEmail = this.currentUserEmail;
    const quantity = this.usedMaterialForm.get('quantity')?.value;
    const description = this.usedMaterialForm.get('description')?.value;
    const projectId = this.projectId;

    const requestData = {
      materialId:materialId,
      material: material,
      quantity: quantity,
      projectId: projectId,
      userEmail: userEmail,
      description:description
    };
  

    this._projectService.usedMaterial(requestData).subscribe(
      () => {
        this.toastr.success('Material Updated successfully');
        this.materialUsed.emit();
        this.dialogRef.close();
      },
      (error) => {
        console.error(error);
        this.toastr.error('An error occurred while updating material');
      }
    );
  }
  

  

}
