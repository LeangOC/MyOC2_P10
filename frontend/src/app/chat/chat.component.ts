import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  ChatMessage,
  ChatService
} from './chat.service';

import { ApiService } from '../core/services/api.service';

import {
  AuthService,
  LoginResponse
} from '../auth/auth.service';


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


  conversationId: number | null = null;

  currentUser:
    LoginResponse | null = null;

  messages:
    ChatMessage[] = [];

  newMessage = '';

  connected = false;

  private subscriptions =
    new Subscription();


  constructor(
    private chatService: ChatService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  /**
   * Détermine si le message appartient
   * à l'utilisateur connecté.
   */
  isMyMessage(
    message: ChatMessage
  ): boolean {

    return message.senderId ===
      this.currentUser?.userId;
  }


  /**
   * Libellé de l'expéditeur.
   */
  getSenderLabel(
    message: ChatMessage
  ): string {

    if (
      message.senderRole ===
      'CUSTOMER'
    ) {

      return `Client ${message.senderEmail}`;
    }

    if (
      message.senderRole ===
      'SUPPORT'
    ) {

      return `Support ${message.senderEmail}`;
    }

    return message.senderEmail;
  }


  ngOnInit(): void {

    /*
     * Récupération de l'utilisateur connecté.
     */
    this.currentUser =
      this.authService.getCurrentUser();

    if (!this.currentUser) {

      this.router.navigate([
        '/login'
      ]);

      return;
    }


    /*
     * Écoute de l'état réel
     * de la connexion WebSocket.
     */
    this.subscriptions.add(

      this.chatService.connected$
        .subscribe(
          connected => {

            this.connected =
              connected;

            console.log(
              'État WebSocket dans ChatComponent :',
              connected
                ? 'Connecté'
                : 'Déconnecté'
            );

            this.cdr.detectChanges();
          }
        )
    );


    /*
     * Écoute des messages reçus.
     */
    this.subscriptions.add(

      this.chatService.messages$
        .subscribe(
          message => {

            if (
              message.conversationId ===
              this.conversationId
            ) {

              this.messages = [
                ...this.messages,
                message
              ];

              console.log(
                'Message ajouté à la conversation :',
                message
              );

              this.cdr.detectChanges();
            }
          }
        )
    );


    /*
     * Écoute de la fermeture
     * de la conversation.
     *
     * Ce cas concerne notamment le support :
     * Alice quitte la conversation et
     * Dupont est informé en temps réel.
     */
    this.subscriptions.add(

      this.chatService.conversationClosed$
        .subscribe(
          event => {

            if (
              event.conversationId ===
              this.conversationId
            ) {

              console.log(
                'Conversation fermée par le client :',
                event.conversationId
              );

              /*
               * La conversation n'est plus active.
               */
              this.conversationId =
                null;

              /*
               * Désactivation immédiate
               * de l'envoi.
               */
              this.connected =
                false;

              /*
               * Fermeture de la connexion
               * WebSocket.
               */
              this.chatService.disconnect();
              this.cdr.detectChanges();
            }
          }
        )
    );


    /*
     * Récupération de la conversation
     * selon le rôle.
     */
    if (
      this.currentUser.role ===
      'CUSTOMER'
    ) {

      /*
       * CUSTOMER :
       * crée ou récupère sa conversation ouverte.
       */
      this.apiService
        .createCustomerConversation(
          this.currentUser.userId
        )
        .subscribe({

          next: conversation => {

            console.log(
              'Conversation client récupérée :',
              conversation
            );

            this.connectToConversation(
              conversation.id
            );
          },

          error: error => {

            console.error(
              'Erreur lors de la récupération de la conversation client :',
              error
            );
          }
        });


    } else if (
      this.currentUser.role ===
      'SUPPORT'
    ) {

      /*
       * SUPPORT :
       * récupère les conversations ouvertes
       * qui lui sont attribuées.
       */
      this.apiService
        .getSupportConversations(
          this.currentUser.userId
        )
        .subscribe({

          next: conversations => {

            console.log(
              'Conversations du support :',
              conversations
            );

            /*
             * Aucune conversation disponible.
             */
            if (
              conversations.length === 0
            ) {

              console.log(
                'Aucune conversation disponible pour ce support.'
              );

              return;
            }

            /*
             * Pour l'instant, on ouvre
             * la première conversation ouverte.
             */
            const conversation =
              conversations[0];

            console.log(
              'Conversation support sélectionnée :',
              conversation
            );

            this.connectToConversation(
              conversation.id
            );
          },

          error: error => {

            console.error(
              'Erreur lors de la récupération des conversations support :',
              error
            );
          }
        });
    }
  }


  /**
   * Configure la conversation puis
   * connecte le WebSocket.
   */
  private connectToConversation(
    conversationId: number
  ): void {

    this.conversationId =
      conversationId;

    console.log(
      'Conversation utilisée :',
      this.conversationId
    );

    this.loadHistory();

    this.chatService.connect(
      this.conversationId
    );
  }


  /**
   * Charge l'historique des messages.
   */
  loadHistory(): void {

    if (
      this.conversationId ===
      null
    ) {

      return;
    }

    this.apiService
      .getMessages(
        this.conversationId
      )
      .subscribe({

        next: messages => {

          this.messages =
            messages;

          this.cdr.detectChanges();
        },

        error: error => {

          console.error(
            'Erreur lors de la récupération de l’historique :',
            error
          );
        }
      });
  }


  /**
   * Envoie un nouveau message.
   */
  sendMessage(): void {

    const content =
      this.newMessage.trim();

    if (!content) {

      return;
    }

    if (!this.currentUser) {

      return;
    }

    if (
      this.conversationId ===
      null
    ) {

      console.warn(
        'Message non envoyé : aucune conversation active'
      );

      return;
    }

    /*
     * Empêche l'envoi tant que WebSocket
     * n'est pas connecté.
     */
    if (!this.connected) {

      console.warn(
        'Message non envoyé : WebSocket non connecté'
      );

      return;
    }

    this.chatService.sendMessage({

      conversationId:
        this.conversationId,

      senderId:
        this.currentUser.userId,

      content:
        content
    });

    this.newMessage = '';
  }


  /**
   * Déconnexion de l'utilisateur.
   */
  logout(): void {

    /*
     * Informe d'abord le backend
     * que l'utilisateur quitte.
     */
    this.chatService
      .leaveConversation();

    /*
     * Puis ferme le WebSocket.
     */
    this.chatService
      .disconnect();

    /*
     * Déconnexion applicative.
     */
    this.authService.logout();

    this.router.navigate([
      '/login'
    ]);
  }


  ngOnDestroy(): void {

    this.subscriptions.unsubscribe();

    this.chatService.disconnect();

    this.connected =
      false;
  }
}
