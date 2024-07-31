import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyRetrieval, partyMember } from '../../../models/party.model';
import { PartyService } from '../../../core/services/party.service';
import { UserAuthService } from '../../../core/services/user-auth.service';
import { ChatService } from '../../../core/services/chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-company-chats',
  templateUrl: './company-chats.component.html',
  styleUrl: './company-chats.component.scss'
})
export class CompanyChatsComponent {


  companyId!:string;
  partyMembers: partyMember[] = [];
  selectedPerson: string | null = null;
  selectedPersonId!:string ;
  message: string = '';
  selectedRoomName!:string;
  messageForm!: FormGroup;
  messages!:any[]
  private messageSubscription: Subscription | undefined;
  chatRoomSubscription: Subscription | undefined;
  public messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _partyService:PartyService,
              private _userAuthService:UserAuthService,
              private _chatService:ChatService,
              private fb: FormBuilder){}
  ngOnInit(): void {
    
    this._route.params.subscribe(params=> {
      this.companyId = params['id']
    })

    this.getAllPartyMembers();

    this.messageForm = this.fb.group({
      message: ['', Validators.required]
    });

    this._chatService.initConnenctionSocket(this.selectedRoomName);
  
    this.listnerMessage();

   
    
  }

  listnerMessage(){

    this._chatService.message$.subscribe((message)=>{
    

      const receivedMessage = JSON.parse(message);
      if(this.selectedRoomName && receivedMessage.chatRoomName === this.selectedRoomName){
      
        this.messages.push({
          content:receivedMessage.content,
          recipientId:receivedMessage.recipientId,
          senderId:receivedMessage.senderId
        })
      }
      
    })
  }



   


  selectPerson(person: partyMember): void {
    this.selectedPerson = person.name;
    this.selectedPersonId = person.id;
    const receiverId = person.id;
    const senderEmail = this._userAuthService.getUserEmail();
    const companyId = this.companyId;
  
    this._chatService.createChatRoom(companyId, senderEmail, receiverId)
      .subscribe(({ roomName, messages }) => {
        console.log('Received room name:', roomName);
       
  
        this.selectedRoomName = roomName;
  
       
        this.messages = Array.isArray(messages) ? messages : []; 
        this._chatService.joinRoom(this.selectedRoomName);
        this.messages.forEach(element => {
          
         
          
        });
        
        
      });
    }
  
  

  getAllPartyMembers(): void {
    this._partyService.getAllPartyMembers(this.companyId).subscribe(
      (response: PartyRetrieval[]) => {
        response.forEach((responseData: PartyRetrieval) => {
          if (responseData && responseData.partyMembers) {
            const loggedInUserEmail = this._userAuthService.getUserEmail(); 
            this.partyMembers = responseData.partyMembers.filter(member => member.party_email !== loggedInUserEmail);
          } else {
            console.error('Invalid response structure');
          }
        });
  
        console.log(this.partyMembers);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  

  sendMessage(): void {
    const receiverId = this.selectedPersonId;
    const senderEmail = this._userAuthService.getUserEmail();
  
    if (this.messageForm.valid) {
      const message = this.messageForm.get('message')?.value;
      if (this.selectedRoomName && message.trim() !== '') {
       
        this._chatService.sendMessage(this.selectedRoomName, message, receiverId, senderEmail)
          .subscribe(
            () => { 
              this.messageForm.reset(); 
             
              
            },
            error => {
              console.error('Error sending message:', error);
            }
          );
      }
    }
  }
  

  
  


}
