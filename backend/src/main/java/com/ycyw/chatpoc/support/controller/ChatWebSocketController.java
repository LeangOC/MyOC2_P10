package com.ycyw.chatpoc.support.controller;

import com.ycyw.chatpoc.support.dto.ChatConversationLeaveRequest;
import com.ycyw.chatpoc.support.dto.ChatMessageRequest;
import com.ycyw.chatpoc.support.dto.ChatMessageResponse;
import com.ycyw.chatpoc.support.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

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
     *
     * Le ChatService vérifie notamment que la conversation
     * est toujours ouverte avant d'enregistrer le message.
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
     *
     * Un événement CONVERSATION_CLOSED est ensuite envoyé
     * aux utilisateurs encore abonnés au topic.
     */
    @MessageMapping("/chat/leave")
    public void leaveConversation(
            ChatConversationLeaveRequest request) {

        Long conversationId =
                request.getConversationId();

        /*
         * Ferme la conversation en base.
         */
        chatService.closeConversation(
                conversationId
        );

        /*
         * Informe les autres utilisateurs connectés
         * que la conversation vient d'être fermée.
         */
        Map<String, Object> event = Map.of(
                "type", "CONVERSATION_CLOSED",
                "conversationId", conversationId
        );

        messagingTemplate.convertAndSend(
                "/topic/conversations/"
                        + conversationId,
                event
        );
    }
}