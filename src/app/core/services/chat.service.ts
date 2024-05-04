import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { ChatMessage, ChatRoomResponse } from '../../models/chat-message';
import { Message, Stomp, StompSubscription } from '@stomp/stompjs';
import { PLATFORM_ID, Inject } from '@angular/core';
import { StompService } from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any
  // private messageSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();
  

  constructor() { 
    // this.initConnenctionSocket();
  }

  initConnenctionSocket(chatRoomName:string) {
    const url = 'http://localhost:3000/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const chatRoomTopic = `topic/${chatRoomName}`
    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
      this.stompClient.subscribe(chatRoomTopic,(message:any)=>{
          this.showMessage(message.body)
      })
    });
  }

  showMessage(message:string){
    this.messageSubject.next(message);
  }




createChatRoom(companyId: string, senderEmail: string | null, receiverId: string): Observable<ChatRoomResponse> {
  const roomSubject = new ReplaySubject<ChatRoomResponse>(1); // Subject to emit the roomName and messages

  // Subscribe to the '/user/queue/messages' destination
  const subscription = this.stompClient.subscribe('/user/queue/messages', (message: Message) => {
    // Callback function invoked when a message is received
    const messagePayload = JSON.parse(message.body); 
    const roomName = messagePayload.roomName; 
    const messages = messagePayload.messages; 
    console.log(roomName); 
    console.log(messages,"mem"); 

    // Emit the roomName and messages to subscribers
    roomSubject.next({ roomName, messages });
  });

  // Send the create chat room request to the backend
  this.stompClient.publish({
    destination: '/app/create-chatRoom',
    body: JSON.stringify({
      companyId: companyId,
      senderEmail: senderEmail,
      receiverId: receiverId
    })
  });

  return roomSubject.asObservable(); // Return the observable to subscribers
}



 

// sendMessage(roomName: string, message: string, receiverId: string, senderEmail: string | null): Observable<void> {
//   // Return an Observable to indicate the status of the message sending operation
//   return new Observable<void>((observer) => {
//     this.stompClient.publish({
//       destination: '/app/chat',
//       body: JSON.stringify({
//           chatRoomName: roomName,
//           message: message,
//           receiverId: receiverId,
//           senderEmail: senderEmail
//       })
//     });
//     // Notify observers that the message has been sent successfully
//     observer.next();
//     observer.complete();
//   });
// }

sendMessage(roomName: string, message: string, receiverId: string, senderEmail: string | null): Observable<void> {
  return new Observable<void>((observer) => {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('WebSocket connection not established.');
      observer.error('WebSocket connection not established.');
      return;
    }

    
    this.stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify({
          chatRoomName: roomName,
          message: message,
          receiverId: receiverId,
          senderEmail: senderEmail
      })
    });

    

    observer.next();
    observer.complete();
  });
}


// sendMessage(roomName: string, message: string, receiverId: string, senderEmail: string | null): Observable<void> {
//   // Return an Observable to indicate the status of the message sending operation
//   return new Observable<void>((observer) => {
//     this.stompClient.publish({
//       destination: `/app/chat/${roomName}`, // Use the correct destination
//       body: JSON.stringify({
//           message: message,
//           receiverId: receiverId,
//           senderEmail: senderEmail
//       })
//     });
//     // Notify observers that the message has been sent successfully
//     observer.next();
//     observer.complete();
//   });
// }






  


  

  // joinRoom(roomId: string) {
  //   this.stompClient.connect({}, ()=>{
  //     this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
  //       const messageContent = JSON.parse(messages.body);
  //       const currentMessage = this.messageSubject.getValue();
  //       currentMessage.push(messageContent);

  //       this.messageSubject.next(currentMessage);

  //     })
  //   })
  // }

 

  // getMessageSubject( selectedRoomName: string){
  //   return this.messageSubject.asObservable();
  // }


  connectToRoom(roomName: string): void {
    if (!this.stompClient.connected) {
      console.error('WebSocket connection not established. Cannot connect to room.');
      return;
    }

    // Subscribe to the specific room topic for room-specific messages
    // const subscription = this.stompClient.subscribe(`/topic/${roomName}`, (message: Message) => {
    //   const messagePayload = JSON.parse(message.body);
    //   this.messageSubject.next([messagePayload]); // Emit an array of received messages
    // });

    // Consider storing the subscription for later unsubscribe (optional)
    // this.subscriptions.push(subscription);
  }


  // getMessageSubject(): Observable<any[]> {
  //   return this.messageSubject.asObservable();
  // }

  joinRoom(roomName: string): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('WebSocket connection not established.');
      return;
    }

    
  this.stompClient.subscribe(`/topic/${roomName}`, (message:any) => {
    this.messageSubject.next(JSON.parse(message.body)); // Update messages array
  });
  }
  

  

}
