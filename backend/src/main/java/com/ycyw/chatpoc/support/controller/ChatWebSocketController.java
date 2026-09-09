package com.ycyw.chatpoc.support.controller;

import com.ycyw.chatpoc.support.dto.ChatConversationLeaveRequest;
import com.ycyw.chatpoc.support.dto.ChatMessageRequest;
import com.ycyw.chatpoc.support.dto.ChatMessageResponse;
import com.ycyw.chatpoc.support.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatWebSocketController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatWebSocketController(
            ChatService chatService,
            SimpMessagingTemplate messagingTemplate) {

        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Réception d'un message envoyé par un utilisateur.
     */
    @MessageMapping("/chat")
    public void sendMessage(ChatMessageRequest request) {

        ChatMessageResponse response =
                chatService.sendMessage(request);

        messagingTemplate.convertAndSend(
                "/topic/conversations/"
                        + response.getConversationId(),
                response
        );
    }

    /**
     * L'utilisateur quitte la conversation.
     *
     * La conversation passe de OPEN à CLOSE.
     */
    @MessageMapping("/chat/leave")
    public void leaveConversation(
            ChatConversationLeaveRequest request) {

        chatService.closeConversation(
                request.getConversationId()
        );
    }
}
