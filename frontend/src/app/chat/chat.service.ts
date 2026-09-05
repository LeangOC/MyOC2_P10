import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

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

  connect(conversationId: number): void {

    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws-chat',

      reconnectDelay: 5000,

      debug: (message: string) => {
        console.log('[STOMP]', message);
      }
    });

    this.client.onConnect = () => {

      console.log('WebSocket connecté');

      this.client?.subscribe(
        `/topic/conversations/${conversationId}`,
        (message: IMessage) => {

          const chatMessage: ChatMessage =
            JSON.parse(message.body);

          this.messageSubject.next(chatMessage);
        }
      );
    };

    this.client.onStompError = (frame) => {

      console.error(
        'Erreur STOMP:',
        frame.headers['message'],
        frame.body
      );
    };

    this.client.onWebSocketError = (error) => {

      console.error('Erreur WebSocket:', error);
    };

    this.client.activate();
  }

  sendMessage(request: ChatMessageRequest): void {

    if (!this.client?.connected) {

      console.error('WebSocket non connecté');

      return;
    }

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
  }
}
