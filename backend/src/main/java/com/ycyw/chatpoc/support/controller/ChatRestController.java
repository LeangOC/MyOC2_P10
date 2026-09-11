package com.ycyw.chatpoc.support.controller;

import com.ycyw.chatpoc.support.dto.ChatMessageResponse;
import com.ycyw.chatpoc.support.dto.ConversationResponse;
import com.ycyw.chatpoc.support.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:4000")

public class ChatRestController {

    private final ChatService chatService;

    public ChatRestController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/conversations/{conversationId}/messages")
    @Operation(summary = "Récupérer l'historique des messages d'une conversation ")
    public List<ChatMessageResponse> getMessages(
            @PathVariable Long conversationId) {

        return chatService.getMessages(conversationId);
    }

    @PostMapping("/conversations")
    @Operation(summary = "Créer une conversation pour un client")
    public ConversationResponse createConversation(
            @RequestParam Long customerId
    ) {
        return chatService.createCustomerConversation(customerId);
    }

    @GetMapping("/conversations")
    @Operation(summary = "Récupérer les conversations du support ")
    public List<ConversationResponse> getSupportConversations(
            @RequestParam Long supportId
    ) {
        return chatService.getSupportConversations(supportId);
    }
}