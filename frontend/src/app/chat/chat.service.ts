import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ChatMessage {

  id: number;
  conversationId: number;
  senderId: number;
  senderEmail: string;
  senderRole: string;
  content: string;
  sentAt: string;
}

export interface ChatMessageRequest {

  conversationId: number;
  senderId: number;
  content: string;
}

export interface ConversationClosedEvent {

  type: 'CONVERSATION_CLOSED';
  conversationId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client: Client | null = null;

  private currentConversationId: number | null = null;

  /*
   * Flux des messages de discussion.
   */
  private messageSubject =
    new Subject<ChatMessage>();

  messages$: Observable<ChatMessage> =
    this.messageSubject.asObservable();

  /*
   * Flux des événements de fermeture
   * de conversation.
   */
  private conversationClosedSubject =
    new Subject<ConversationClosedEvent>();

  conversationClosed$: Observable<ConversationClosedEvent> =
    this.conversationClosedSubject.asObservable();

  /*
   * État réel de la connexion WebSocket.
   */
  private connectedSubject =
    new BehaviorSubject<boolean>(false);

  connected$: Observable<boolean> =
    this.connectedSubject.asObservable();


  /**
   * Connexion WebSocket/STOMP à une conversation.
   */
  connect(conversationId: number): void {

    this.currentConversationId =
      conversationId;

    /*
     * Évite de créer plusieurs connexions
     * si le WebSocket est déjà actif.
     */
    if (this.client?.active) {

      console.log(
        'WebSocket déjà actif'
      );

      return;
    }

    this.connectedSubject.next(false);

    this.client = new Client({

      brokerURL:
        'ws://localhost:8080/ws-chat',

      reconnectDelay: 5000,

      debug: (message: string) => {

        console.log(
          '[STOMP]',
          message
        );
      }
    });

    /**
     * Connexion STOMP réellement établie.
     */
    this.client.onConnect = () => {

      console.log(
        'WebSocket connecté'
      );

      this.connectedSubject.next(true);

      this.client?.subscribe(

        `/topic/conversations/${conversationId}`,

        (message: IMessage) => {

          const data =
            JSON.parse(message.body);

          console.log(
            'Donnée reçue :',
            data
          );

          /*
           * Événement de fermeture de conversation.
           */
          if (
            data.type ===
            'CONVERSATION_CLOSED'
          ) {

            const event:
              ConversationClosedEvent = data;

            console.log(
              'Conversation fermée :',
              event.conversationId
            );

            this.conversationClosedSubject.next(
              event
            );

            return;
          }

          /*
           * Sinon, il s'agit d'un véritable
           * message de discussion.
           */
          const chatMessage:
            ChatMessage = data;

          console.log(
            'Message reçu :',
            chatMessage
          );

          this.messageSubject.next(
            chatMessage
          );
        }
      );
    };

    /**
     * Erreur STOMP.
     */
    this.client.onStompError = (frame) => {

      console.error(
        'Erreur STOMP:',
        frame.headers['message'],
        frame.body
      );

      this.connectedSubject.next(false);
    };

    /**
     * Erreur WebSocket.
     */
    this.client.onWebSocketError = (error) => {

      console.error(
        'Erreur WebSocket:',
        error
      );

      this.connectedSubject.next(false);
    };

    /**
     * Déconnexion.
     */
    this.client.onDisconnect = () => {

      console.log(
        'WebSocket déconnecté'
      );

      this.connectedSubject.next(false);
    };

    this.client.activate();
  }


  /**
   * Informe le backend que l'utilisateur
   * quitte la conversation.
   */
  leaveConversation(): void {

    if (!this.client?.connected) {

      console.warn(
        'Impossible de quitter la conversation : WebSocket non connecté'
      );

      return;
    }

    if (this.currentConversationId === null) {

      console.warn(
        'Impossible de quitter la conversation : conversation inconnue'
      );

      return;
    }

    console.log(
      'Départ de la conversation :',
      this.currentConversationId
    );

    this.client.publish({

      destination:
        '/app/chat/leave',

      body: JSON.stringify({

        conversationId:
          this.currentConversationId
      })
    });
  }


  /**
   * Envoie un message.
   */
  sendMessage(
    request: ChatMessageRequest
  ): void {

    if (!this.client?.connected) {

      console.error(
        'Impossible d’envoyer le message : WebSocket non connecté'
      );

      return;
    }

    if (this.currentConversationId === null) {

      console.error(
        'Impossible d’envoyer le message : aucune conversation active'
      );

      return;
    }

    console.log(
      'Envoi du message :',
      request
    );

    this.client.publish({

      destination:
        '/app/chat',

      body:
        JSON.stringify(request)
    });
  }


  /**
   * Ferme proprement la connexion WebSocket.
   */
  disconnect(): void {

    if (this.client) {

      this.client.deactivate();

      this.client = null;
    }

    this.currentConversationId =
      null;

    this.connectedSubject.next(false);
  }
}
