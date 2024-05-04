import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChatService } from '../../core/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../../models/chat-message';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.model';
import { getUserId } from '../../store/auth/auth.selector';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {

  messageInput: string = '';
  userId!: string;
  messageList: any[] = [];

  constructor(private chatService: ChatService,
    private route: ActivatedRoute,private _store:Store<AuthState>
    ){

  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    // this.chatService.joinRoom("ABC");
    // this.lisenerMessage();

    this._store.select(getUserId).subscribe(id=>{
      this.userId = id ?? '';
    })
  }

  // sendMessage() {
  //   const chatMessage = {
  //     message: this.messageInput,
  //     user: this.userId
  //   }as ChatMessage
  //   this.chatService.sendMessage("ABC", chatMessage);
  //   this.messageInput = '';
  // }

  // lisenerMessage() {
  //   this.chatService.getMessageSubject().subscribe((messages: any) => {
  //     this.messageList = messages.map((item: any)=> ({
  //       ...item,
  //       message_side: item.user === this.userId ? 'sender': 'receiver'
  //     }))
  //   });
  // }
}


