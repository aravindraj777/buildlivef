import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../../../core/services/company.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrl: './add-material.component.scss'
})
export class AddMaterialComponent implements OnInit {

  @Output() materialAdded: EventEmitter<void> = new EventEmitter<void>();
  companyId!:string;
  materialForm!:FormGroup;
  units: string[] = [
    'Nos', 'Numbers', 'Kg', 'Bags', 'Cft', 'Tonne', 'Brass', 'Litre',
    'Sqft', 'Km', 'Meter', 'Box', 'Ft', 'Cum', 'Quintal', 'Mm', 'Sqm',
    'Kilolitre', 'In', 'Gram', 'Cm', 'Lb', 'Trips', 'Unit', 'Hours',
    'Bundle', 'Drum', 'Gallons', 'Pac', 'Pair', 'Pcs', 'Roll', 'Set'
  ];
  gstOptions: number[] = [
    18, 12, 5, 0, 28, 0.10, 0.25, 1.50, 3, 6, 7.50, 14
  ];

  constructor(private fb:FormBuilder,
    private companyService:CompanyService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<AddMaterialComponent>,
    private _toastr:ToastrService
  ){
    this.companyId = data.companyId;
    
  }

  ngOnInit() {
    this.materialForm = this.fb.group({
        name: ['', Validators.required],
        unit: ['', Validators.required],
        gst: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.materialForm.valid) {
      this.companyService.addMaterialsToCompany(this.companyId, this.materialForm.value)
        .subscribe(
          () => {
            this._toastr.success('Material added successfully');
            this.dialogRef.close();
            this.materialAdded.emit(); 
          },
          (error) => {
            this._toastr.error('Failed to add material', 'Error');
          }
        );
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}

