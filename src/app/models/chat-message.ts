import { timestamp } from "rxjs";

export interface ChatMessage {
    message: string;
    user: string;
}

export interface ChatRoomResponse {
    roomName: string;
    messages: any[];
  }

  export interface Messages{

    id:string;
    chatRoomName:string;
    senderId:string;
    recipientId:string;
    companyId:string;
    content:string;
    timestamp:Date;
  }