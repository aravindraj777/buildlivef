import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMaterialComponent } from '../add-material/add-material.component';
import { ActivatedRoute } from '@angular/router';
import { Material } from '../../../models/material.model';
import { CompanyService } from '../../../core/services/company.service';

@Component({
  selector: 'app-company-materials',
  templateUrl: './company-materials.component.html',
  styleUrl: './company-materials.component.scss'
})
export class CompanyMaterialsComponent implements OnInit{


  companyId!:string;
  materials:Material[]=[];
  constructor(private dialog:MatDialog,
    private _route:ActivatedRoute,
    private _companyService:CompanyService
  ){}


  ngOnInit(): void {
   this._route.params.subscribe(params => {
    this.companyId = params['id'];
   })
   this.fetchMaterials();
   console.log(this.companyId,"in material");
   
  }

  openAddMaterial():void{
    const dialogRef = this.dialog.open(AddMaterialComponent, {
      width: '400px',
      data:{
        companyId:this.companyId
      }
    });
    dialogRef.componentInstance.materialAdded.subscribe(()=>{
      this.fetchMaterials();
    })
  }

  fetchMaterials(): void {
    this._companyService.fetchMaterialsOfACompany(this.companyId).subscribe(
      (materials: Material[]) => {
        this.materials = materials;
      },
      (error) => {
        console.error('Error fetching materials:', error);
      
      }
    );
  }

}
