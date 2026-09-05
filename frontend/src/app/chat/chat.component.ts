import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ChatMessage,
  ChatService
} from './chat.service';

import {
  ApiService
} from '../core/services/api.service';

import {
  AuthService,
  LoginResponse
} from '../auth/auth.service';

import { Router } from '@angular/router';

currentUser: LoginResponse | null = null;
constructor(
  private chatService: ChatService,
  private apiService: ApiService,
  private authService: AuthService
) {
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent
  implements OnInit, OnDestroy {

  conversationId = 1;



  messages: ChatMessage[] = [];

  newMessage = '';

  connected = false;

  constructor(
    private chatService: ChatService,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {

    this.currentUser =
      this.authService.getCurrentUser();

    if (!this.currentUser) {

      return;
    }

    this.loadHistory();

    this.chatService.connect(
      this.conversationId
    );

    this.chatService.messages$
      .subscribe(message => {

        this.messages.push(message);
      });

    this.connected = true;
  }

  loadHistory(): void {

    this.apiService
      .getMessages(this.conversationId)
      .subscribe({

        next: messages => {
          this.messages = messages;
        },

        error: error => {
          console.error(
            'Erreur récupération historique',
            error
          );
        }
      });
  }

  sendMessage(): void {

    const content =
      this.newMessage.trim();

    if (!content) {
      return;
    }

    this.chatService.sendMessage({

      conversationId:
        this.conversationId,

      senderId: this.currentUser!.userId,

      content
    });

    this.newMessage = '';
  }

  ngOnDestroy(): void {

    this.chatService.disconnect();
  }
logout(): void {

  this.authService.logout();

  this.chatService.disconnect();

  this.router.navigate(['/login']);
}
}
