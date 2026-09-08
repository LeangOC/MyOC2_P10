import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ChatMessage, ChatService } from './chat.service';
import { ApiService } from '../core/services/api.service';
import { AuthService, LoginResponse } from '../auth/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  conversationId: number | null = null;
  currentUser: LoginResponse | null = null;
  messages: ChatMessage[] = [];
  newMessage = '';
  connected = false;

  private subscriptions = new Subscription();

  constructor(
    private chatService: ChatService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    /*
     * Écoute l'état réel de la connexion WebSocket.
     */
    this.subscriptions.add(
      this.chatService.connected$.subscribe(
        connected => {
          this.connected = connected;

          console.log(
            'État WebSocket dans ChatComponent :',
            connected ? 'Connecté' : 'Déconnecté'
          );
        }
      )
    );

    /*
     * Écoute les messages reçus.
     */
    this.subscriptions.add(
      this.chatService.messages$.subscribe(message => {

        if (message.conversationId === this.conversationId) {

           this.messages = [...this.messages, message];

          console.log(
            'Message ajouté à la conversation :',
            message
          );
        }
      })
    );

    /*
     * Récupère ou crée la conversation du client.
     */
    this.apiService
      .createCustomerConversation(this.currentUser.userId)
      .subscribe({

        next: conversation => {

          this.conversationId = conversation.id;

          console.log(
            'Conversation utilisée :',
            this.conversationId
          );

          this.loadHistory();

          this.chatService.connect(this.conversationId);
        },

        error: error => {

          console.error(
            'Erreur lors de la récupération de la conversation :',
            error
          );
        }
      });
  }

  loadHistory(): void {

    if (this.conversationId === null) {
      return;
    }

    this.apiService
      .getMessages(this.conversationId)
      .subscribe({

        next: messages => {
          this.messages = messages;
        },

        error: error => {

          console.error(
            'Erreur lors de la récupération de l’historique :',
            error
          );
        }
      });
  }

  sendMessage(): void {

    const content = this.newMessage.trim();

    if (!content) {
      return;
    }

    if (!this.currentUser) {
      return;
    }

    if (this.conversationId === null) {
      return;
    }

    /*
     * Empêche l'envoi tant que WebSocket n'est pas connecté.
     */
    if (!this.connected) {

      console.warn(
        'Message non envoyé : WebSocket non connecté'
      );

      return;
    }

    this.chatService.sendMessage({

      conversationId: this.conversationId,

      senderId: this.currentUser.userId,

      content: content
    });

    this.newMessage = '';
  }

  logout(): void {

    this.chatService.disconnect();

    this.authService.logout();

    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

    this.chatService.disconnect();

    this.connected = false;
  }
}
