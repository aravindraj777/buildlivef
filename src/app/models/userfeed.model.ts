import { User } from "../store/auth/auth.model";

export interface Posts{

    id:string;
    content:string;
    imageUrl:string;
    imageId:string;
    createdDate:Date;
    user:User
}