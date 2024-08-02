import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/auth.model';
import { getUserId } from '../../../store/auth/auth.selector';
import { PostService } from '../../../core/services/post.service';
import { Posts } from '../../../models/userfeed.model';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrl: './user-post.component.scss'
})
export class UserPostComponent implements OnInit {

  userId!:string | undefined;
  selectedFile!: File;
  feedForm!: FormGroup
  imageSrc: any;
  posts!:Posts[]
  premiumUser:boolean  = false;

  constructor(private store:Store<AuthState>,
    private fb:FormBuilder,
    private postService:PostService
  ){

  }
  ngOnInit(): void {
    this.store.select(getUserId).subscribe(id=>{
      this.userId = id;
    });

    this.feedForm = this.fb.group({
      content: ['',Validators.required],
      file : [null,Validators.required]
    })

    this.getAllPosts()
    this.checkIsSubscribed();
  }

 
  addFeed() {
    const formData = new FormData();
    formData.append('content', this.feedForm.value.content ?? '');
    formData.append('userId', this.userId ?? '');
    if (this.selectedFile !== undefined) {
      formData.append('file', this.selectedFile);
    }

    this.postService.addFeed(formData).subscribe({
      next: (response) => {
         this.getAllPosts();
        this.feedForm.reset();
        this.imageSrc = null;
        console.log(response);
        
      },
    });
  }
  postImage(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    this.feedForm.patchValue(this.selectedFile);

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  


  onDeleteFeed(arg0: any) {
    throw new Error('Method not implemented.');
  }


  getAllPosts(){
    this.postService.getAllPosts().subscribe(({
      next:(res:Posts[])=>{
        
        console.log(res);
        console.log("==========");
        
        this.posts = res;
        console.log(this.posts);
        
      }
    }))
  }

  checkIsSubscribed(){
    this.postService.isPremiumUser(this.userId).subscribe(({
      next: (res:boolean)=>{
        this.premiumUser = res
        console.log(this.premiumUser);
        
      },
      error: (error)=>{
        console.log(error);
        
      }
    }))
  }
}
