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

  initConnenctionSocket(chatRoomName: string) {
    // const url = 'https://chat.buildlive360.online/ws';
    const url = 'http://localhost:3000/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const chatRoomTopic = `topic/${chatRoomName}`
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(chatRoomTopic, (message: any) => {
        this.showMessage(message.body)
      })
    });
  }

  showMessage(message: string) {
    this.messageSubject.next(message);
  }




  createChatRoom(companyId: string, senderEmail: string | null, receiverId: string): Observable<ChatRoomResponse> {
    const roomSubject = new ReplaySubject<ChatRoomResponse>(1);

    const subscription = this.stompClient.subscribe('/user/queue/messages', (message: Message) => {
      const messagePayload = JSON.parse(message.body);
      const roomName = messagePayload.roomName;
      const messages = messagePayload.messages;

      roomSubject.next({ roomName, messages });
    });


    this.stompClient.publish({
      destination: '/app/create-chatRoom',
      body: JSON.stringify({
        companyId: companyId,
        senderEmail: senderEmail,
        receiverId: receiverId
      })
    });

    return roomSubject.asObservable();
  }


  sendMessage(roomName: string, message: string, receiverId: string, senderEmail: string | null): Observable<void> {
    return new Observable<void>((observer) => {
      if (!this.stompClient || !this.stompClient.connected) {
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

  connectToRoom(roomName: string): void {
    if (!this.stompClient.connected) {
      console.error('WebSocket connection not established. Cannot connect to room.');
      return;
    }


  }




  joinRoom(roomName: string): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('WebSocket connection not established.');
      return;
    }


    this.stompClient.subscribe(`/topic/${roomName}`, (message: any) => {
      this.messageSubject.next(JSON.parse(message.body));
    });
  }




}
