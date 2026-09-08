import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../chat/chat.service';

export interface Conversation {
 id: number;
   customerId: number;
   supportId: number;
   status: string;
}

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getMessages(
    conversationId: number
  ): Observable<ChatMessage[]> {

    return this.http.get<ChatMessage[]>(
      `${this.apiUrl}/support/conversations/${conversationId}/messages`
    );
  }

  createCustomerConversation(customerId: number) {
    return this.http.post<Conversation>(
      `${this.apiUrl}/support/conversations`,
      null,
      {
        params: {
          customerId
        }
      }
    );
  }

  getSupportConversations(supportId: number) {
    return this.http.get<Conversation[]>(
      `${this.apiUrl}/support/conversations`,
      {
        params: {
          supportId
        }
      }
    );
  }
}





