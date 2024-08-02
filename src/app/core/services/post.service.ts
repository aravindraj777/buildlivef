import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts } from '../../models/userfeed.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }


  addFeed(formData:FormData):Observable<any>{
    return this.http.post<any>('user/posts/add-feed',formData)
  };

  getAllPosts():Observable<Posts[]>{
    return this.http.get<Posts[]>('user/posts/getAll');
  }

  isPremiumUser(userId: string | undefined) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    return this.http.get<boolean>(`user/${userId}/plans/isPremiumUser`);
  }
}
