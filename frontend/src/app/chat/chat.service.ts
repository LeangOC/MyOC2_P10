import { Injectable, NgZone } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ChatMessage {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  sentAt: string;
}

export interface ChatMessageRequest {
  conversationId: number;
  senderId: number;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client: Client | null = null;

  private messageSubject = new Subject<ChatMessage>();

  messages$: Observable<ChatMessage> =
    this.messageSubject.asObservable();

  private connectedSubject =
    new BehaviorSubject<boolean>(false);

  connected$: Observable<boolean> =
    this.connectedSubject.asObservable();

  constructor(
    private ngZone: NgZone
  ) {}

  connect(conversationId: number): void {

    // Évite de créer plusieurs connexions
    if (this.client?.active) {
      console.log('WebSocket déjà actif');
      return;
    }

    this.connectedSubject.next(false);

    this.client = new Client({

      brokerURL: 'ws://localhost:8080/ws-chat',

      reconnectDelay: 5000,

      debug: (message: string) => {
        console.log('[STOMP]', message);
      }
    });

    /*
     * Connexion STOMP réellement établie.
     */
    this.client.onConnect = () => {

      console.log('WebSocket connecté');

      this.connectedSubject.next(true);

      this.client?.subscribe(
        `/topic/conversations/${conversationId}`,

        (message: IMessage) => {

          const chatMessage: ChatMessage =
            JSON.parse(message.body);

          console.log(
            'Message reçu :',
            chatMessage
          );

          /*
           * Le callback STOMP/WebSocket peut être exécuté
           * en dehors de la zone Angular.
           *
           * On force donc Angular à détecter
           * la modification de l'état.
           */
          this.ngZone.run(() => {

            this.messageSubject.next(
              chatMessage
            );

          });
        }
      );
    };

    /*
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

    /*
     * Erreur WebSocket.
     */
    this.client.onWebSocketError = (error) => {

      console.error(
        'Erreur WebSocket:',
        error
      );

      this.connectedSubject.next(false);
    };

    /*
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

  sendMessage(
    request: ChatMessageRequest
  ): void {

    if (!this.client?.connected) {

      console.error(
        'Impossible d’envoyer le message : WebSocket non connecté'
      );

      return;
    }

    console.log(
      'Envoi du message :',
      request
    );

    this.client.publish({

      destination: '/app/chat',

      body: JSON.stringify(request)

    });
  }

  disconnect(): void {

    if (this.client) {

      this.client.deactivate();

      this.client = null;
    }

    this.connectedSubject.next(false);
  }
}
