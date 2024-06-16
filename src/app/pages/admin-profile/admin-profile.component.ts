import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { AuthState } from '../../store/auth/auth.model';
import { AdminService } from '../../core/services/admin.service';
import { getEmail, getUserId } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent {



  user$: Subscription | undefined;
  user: any = {};
  email!: string | undefined;
  userId!: any;
  formField: boolean = false;
  changeProfileBtn: boolean = true;
  selectedImage!: File;
  uploadProfilePic!: FormGroup;
  profilePictureUrl!: string;
  userName: string | undefined;
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('profileForm') profileForm: any;
  showErrorMessage!: Observable<string>;
  updateForm!: FormGroup;
  imagePreview!: string | ArrayBuffer | null;

  constructor(
    private store: Store<AuthState>,
    private fb: FormBuilder,
    private masterService: AdminService
  ) {}

  ngOnInit(): void {
    // this.showErrorMessage = this.store.select();
    this.store.select(getEmail).subscribe((data) => {
      this.email = data;
    });
    this.store.select(getUserId).subscribe((data) => {
      this.userId = data;
    });
    this.getUserById();

    this.uploadProfilePic = this.fb.group({
      file: [null],
    });
    
    
  }

  changeProfilePicClicked() {
    this.formField = true;
    this.changeProfileBtn = false;
  }

  handleFileChange(event: any) {
    
    this.selectedImage = event.target.files[0];
    this.uploadProfilePic.patchValue(this.selectedImage);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);
    this.formField = true;
  }


  submitProPic() {
    if (this.userId) {
      console.log(this.userId, ' ', this.selectedImage);

      this.masterService
        .changeProfilePicture(this.selectedImage, this.userId)
        .subscribe((response) => {
          this.getUserById()
          this.formField = false;
          this.changeProfileBtn = true;
        });
    } else {
      console.error;
    }
  }


  getUserById() {
    this.masterService.getUserById(this.userId).subscribe((response) => {
      this.user = response;
    
    });
  }

}
