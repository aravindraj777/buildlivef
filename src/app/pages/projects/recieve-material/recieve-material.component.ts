import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartyService } from '../../../core/services/party.service';
import { PartyRetrieval, partyMember } from '../../../models/party.model';
import { CompanyService } from '../../../core/services/company.service';
import { Material } from '../../../models/material.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recieve-material',
  templateUrl: './recieve-material.component.html',
  styleUrl: './recieve-material.component.scss'
})
export class RecieveMaterialComponent implements OnInit{

  companyId!:string;
  projectId!:string;
  partyMembers:partyMember[]=[];
  materials:Material[]=[];
  receiveMaterialForm!: FormGroup;
  currentUserInfo: any;
  currentUserEmail!:string;
  
  @Output() materialReceived: EventEmitter<void> = new EventEmitter<void>();


  constructor(public dialogRef:MatDialogRef<RecieveMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{projectId:string,companyId:string},
    private _partyService:PartyService,
    private _companyService:CompanyService,
    private formBuilder: FormBuilder,
    private _projectService:ProjectService,
    private toastr:ToastrService
  ){
      this.companyId = data.companyId;
      this.projectId = data.projectId;
      console.log(this.companyId);
      
  }


  ngOnInit(): void {
    this.initializeForm();
    this.getAllPartyMembers();
    this.fetchMaterials();

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
  }
  

  getAllPartyMembers(): void {
    this._partyService.getAllPartyMembers(this.companyId).subscribe(
      (response: PartyRetrieval[]) => {
        response.forEach((responseData: PartyRetrieval) => {
          if (responseData && responseData.partyMembers) {
            if (!this.partyMembers) {
              this.partyMembers = responseData.partyMembers;
            } else {
              this.partyMembers = this.partyMembers.concat(responseData.partyMembers);
            }
          } else {
            console.error('Invalid response structure');
          }
        });

        console.log(this.partyMembers);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchMaterials(): void {
    this._companyService.fetchMaterialsOfACompany(this.companyId).subscribe(
      (materials: Material[]) => {
        console.log(materials);
        
        this.materials = materials;
      },
      (error) => {
        console.error('Error fetching materials:', error);
      
      }
    );
  }

  initializeForm(): void {
    this.receiveMaterialForm = this.formBuilder.group({
      selectParty: ['', Validators.required],
      selectMaterial: ['', Validators.required],
      quantity: ['', [Validators.required,Validators.min(0)]]
    });
}

getMaterialUnitPlaceholder(): string {
  const selectedMaterial = this.materials.find(material => material.materialName === this.receiveMaterialForm.get('selectMaterial')?.value);
  return selectedMaterial ? `Quantity in ${selectedMaterial.unit}` : 'Quantity';
}

onSubmit(): void {
  const selectedPartyMember = this.receiveMaterialForm.get('selectParty')?.value;
  const selectedMaterial = this.receiveMaterialForm.get('selectMaterial')?.value;
  const quantity = this.receiveMaterialForm.get('quantity')?.value;
  const projectId = this.projectId;
  const userEmail = this.currentUserEmail;

  const requestData = {
    partyMember: selectedPartyMember,
    material: selectedMaterial,
    quantity: quantity,
    projectId: projectId,
    userEmail: userEmail
  };

  this._projectService.receiveMaterial(requestData).subscribe(
    () => {
      this.toastr.success('Material received successfully');
      this.materialReceived.emit();
      this.dialogRef.close();
    },
    (error) => {
      console.error(error);
      this.toastr.error('An error occurred while receiving material');
    }
  );
}





onCancel(): void {
  this.dialogRef.close();
}

}
