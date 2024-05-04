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

    console.log(this.companyId,"company id in ");
    this.getAllPartyMembers();

    this.messageForm = this.fb.group({
      message: ['', Validators.required]
    });

    this._chatService.initConnenctionSocket(this.selectedRoomName);
   
    // this.messageSubscription = this._chatService.getMessageSubject().subscribe(messages => {
    //   this.messages = messages;
    // });
    this.listnerMessage();

   
    
  }

  listnerMessage(){

    this._chatService.message$.subscribe((message)=>{
      console.log("Recieved",message);

      const receivedMessage = JSON.parse(message);
      if(this.selectedRoomName && receivedMessage.chatRoomName === this.selectedRoomName){
        console.log("jjjjj");
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
        console.log('Received messages:', messages); // Log the messages object
  
        // Check the structure of the messages object in the console
  
        this.selectedRoomName = roomName;
  
        // Convert the messages object to an array
        this.messages = Array.isArray(messages) ? messages : []; // Ensure messages is an array
        this._chatService.joinRoom(this.selectedRoomName);
        this.messages.forEach(element => {
          console.log(element.content);
         
          
        });
        // Use the received messages or initialize as an empty array if undefined
        
      });
    }
  
  

  getAllPartyMembers(): void {
    this._partyService.getAllPartyMembers(this.companyId).subscribe(
      (response: PartyRetrieval[]) => {
        response.forEach((responseData: PartyRetrieval) => {
          if (responseData && responseData.partyMembers) {
            // Filter out the logged-in user
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


  // sendMessage(person:string): void {
  //   const receiverId = person;
  //   const senderEmail = this._userAuthService.getUserEmail();
  //   if (this.messageForm.valid) {
  //     const message = this.messageForm.get('message')?.value;
  //     if (this.selectedRoomName && message.trim() !== '') {
  //       this._chatService.sendMessage(this.selectedRoomName, message,receiverId,senderEmail);
  //       this.messageForm.reset(); // Reset the form after sending the message
  //     }
  //   }
  // }

  sendMessage(): void {
    const receiverId = this.selectedPersonId;
    const senderEmail = this._userAuthService.getUserEmail();
  
    if (this.messageForm.valid) {
      const message = this.messageForm.get('message')?.value;
      if (this.selectedRoomName && message.trim() !== '') {
        // Send message to the server
        this._chatService.sendMessage(this.selectedRoomName, message, receiverId, senderEmail)
          .subscribe(
            () => { // Success callback (optional)
              console.log('Message sent successfully');
              this.messageForm.reset(); // Reset the form after sending the message

              // Add the sent message to the local messages array
             
              
            },
            error => {
              console.error('Error sending message:', error);
            }
          );
      }
    }
  }
  

  
  


}
