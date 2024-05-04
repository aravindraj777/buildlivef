import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialEntries } from '../../../models/material.model';
import { ProjectService } from '../../../core/services/project.service';
import { Location } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';





@Component({
  selector: 'app-material-entry-details',
  templateUrl: './material-entry-details.component.html',
  styleUrl: './material-entry-details.component.scss'
})
export class MaterialEntryDetailsComponent implements OnInit{

  materialId!:string;
  materialEntries:MaterialEntries[]=[];
  currentPage = 1;
  pageSize = 10;
  isLoading = false;
  selectedMaterialType: string = 'All';
  originalMaterialEntries: MaterialEntries[] = [];


  constructor(private _route:ActivatedRoute,
              private _projectService:ProjectService,
              private _router:Router,
              private _location:Location
  ){}
  ngOnInit(): void {
   this._route.queryParams.subscribe(params => {
    this.materialId = params['materialId'];
   });

   console.log(this.materialId,"uuuu");
   this.fetchProjectMaterialEntry();
  }

  fetchProjectMaterialEntry():void{
    this.isLoading = true;
    this._projectService.getMaterialEntries(this.materialId).subscribe(
      response=>{
        this.materialEntries = response
        this.originalMaterialEntries = response;
      },
      error=>{
        console.log(error);
        
      }
    )
  }

  goBack(){
   this._location.back();
  }



  generateInvoicePdf(): void {
    // Generate PDF document from materialEntries data
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinition = {
      content: [
        { text: 'Invoice', style: 'header' },
        // Add material entry details here using ngFor or static HTML
        { text: 'Material Entries:', style: 'subheader' },
        ...this.materialEntries.map(entry => [
          { text: entry.entryTime, bold: true },
          // { text: `Party: ${entry.projectMaterial.partyMember}` },
          { text: `EntryPerson: ${entry.entryPerson}` },
          { text: `Details: ${entry.projectMaterial.usedDescription}` },
          { text: `${entry.materialType === 'RECEIVED' ? '+' : '-'} ${entry.quantity}` },
          { text: '-----------------------------' } // Separator between entries
        ])
      ],
      styles: {
        header: { fontSize: 18, bold: true },
        subheader: { fontSize: 14, bold: true }
      }
    };

    // Generate PDF document
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blob) => {
      // Save PDF file
      saveAs(blob, 'invoice.pdf');
    });


  }

  filterEntries(materialType: string): void {
    if (materialType === 'All') {
        this.selectedMaterialType = 'All';
        
        this.materialEntries = this.originalMaterialEntries;
    } else {
        this.selectedMaterialType = materialType;
       
        this.materialEntries = this.originalMaterialEntries.filter(entry => entry.materialType === materialType);
    }
  }
}
