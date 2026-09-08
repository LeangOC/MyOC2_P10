package com.ycyw.chatpoc.support.controller;

import com.ycyw.chatpoc.support.dto.ChatMessageResponse;
import com.ycyw.chatpoc.support.dto.ConversationResponse;
import com.ycyw.chatpoc.support.service.ChatService;
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
    public List<ChatMessageResponse> getMessages(
            @PathVariable Long conversationId) {

        return chatService.getMessages(conversationId);
    }
    @PostMapping("/conversations")
    public ConversationResponse createConversation(
            @RequestParam Long customerId
    ) {
        return chatService.createCustomerConversation(customerId);
    }
    @GetMapping("/conversations")
    public List<ConversationResponse> getSupportConversations(
            @RequestParam Long supportId
    ) {
        return chatService.getSupportConversations(supportId);
    }
}