import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceSearchResult, project } from '../../../models/project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../core/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/auth.model';
import { getUserId } from '../../../store/auth/auth.selector';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent implements OnInit,AfterViewInit {

  showAdditionalDetails: boolean = false;
  projectCreateForm!:FormGroup;
  companyId!:string;
  userId:string | undefined


  @ViewChild('inputField')
  inputField!: ElementRef;

  photoUrl:string | undefined='';


  @Input() placeholder=''

  autoComplete: google.maps.places.Autocomplete | undefined

  constructor(private _route:ActivatedRoute,
              private _formBuilder:FormBuilder,
              private _projectService: ProjectService,
              private _toastr:ToastrService,
              private _router:Router,
              private _store:Store<AuthState>){}

  ngAfterViewInit(): void {
    this.autoComplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autoComplete.addListener('place_changed',()=>{
      const place = this.autoComplete?.getPlace();

      const result: PlaceSearchResult = {
        address : this.inputField.nativeElement.value,
        name : place?.name,
        location : place?.geometry?.location,
        iconUrl : place?.icon
      }

        this.getPhotoUrl(place)

      console.log(place);
      
    })
    

    
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.companyId = params['id'];
    })


    this.projectCreateForm = this._formBuilder.group({
      projectName: this._formBuilder.control('',Validators.required),
      address : this._formBuilder.control('',Validators.required),
      city : this._formBuilder.control('',Validators.required),
      startDate : this._formBuilder.control([null,Validators.required]),
      endDate : this._formBuilder.control([null,Validators.required]),
      projectValue : this._formBuilder.control('')
    });

    this._store.select(getUserId).subscribe((userId)=>{
      this.userId = userId;
      console.log("userr",userId);
      
    })
  }


  
  toggleAdditionalDetails(): void {
    this.showAdditionalDetails = !this.showAdditionalDetails;
  }


  getPhotoUrl(place: google.maps.places.PlaceResult | undefined) :string | undefined {

    this.photoUrl =  place?.photos && place.photos.length > 0 
    ? place.photos[0].getUrl({maxWidth: 90}) 
    : undefined;
    console.log(this.photoUrl);


    const city = place?.formatted_address;

    if(city){
      this.projectCreateForm.get('city')?.setValue(city);
    }
    
    return this.photoUrl;
  }


  createProject():void{

    console.log(this.projectCreateForm.value);

    const request:project = {

      projectName: this.projectCreateForm.value.projectName,
      address : this.projectCreateForm.value.address,
      city    : this.projectCreateForm.value.city,
      start_date: this.projectCreateForm.value.startDate,
      end_date : this.projectCreateForm.value.endDate,
      project_value: this.projectCreateForm.value.projectValue,
      company:this.companyId,
      creator:this.userId
    }

    console.log(request,"ref");

    if (this.projectCreateForm.valid && request != null) {
      this._projectService.createProject(request).subscribe({
          next: (response) => {
              // Navigate to the view-all page with the company ID as parameter
              this._router.navigate(['/projects/view-all', this.companyId]);
              this._toastr.success(response.message);
          },
          error: (error) => {
              this._toastr.error("Failed, Try again");
          }
      });

    }
  }
  



}
