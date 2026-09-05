package com.ycyw.chatpoc.support.service;

import com.ycyw.chatpoc.support.dto.ChatMessageRequest;
import com.ycyw.chatpoc.support.dto.ChatMessageResponse;
import com.ycyw.chatpoc.support.entity.ChatConversation;
import com.ycyw.chatpoc.support.entity.ChatMessage;
import com.ycyw.chatpoc.support.repository.ChatConversationRepository;
import com.ycyw.chatpoc.support.repository.ChatMessageRepository;
import com.ycyw.chatpoc.user.entity.User;
import com.ycyw.chatpoc.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@Transactional
public class ChatService {

    private final ChatConversationRepository conversationRepository;
    private final ChatMessageRepository messageRepository;
    private final UserRepository userRepository;

    public ChatService(
            ChatConversationRepository conversationRepository,
            ChatMessageRepository messageRepository,
            UserRepository userRepository) {

        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public ChatMessageResponse sendMessage(ChatMessageRequest request) {

        ChatConversation conversation = conversationRepository
                .findById(request.getConversationId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Conversation introuvable"));

        User sender = userRepository
                .findById(request.getSenderId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Utilisateur introuvable"));

        ChatMessage message = new ChatMessage();

        message.setConversation(conversation);
        message.setSender(sender);
        message.setContent(request.getContent());
        message.setSentAt(Instant.now());

        ChatMessage savedMessage = messageRepository.save(message);

        return toResponse(savedMessage);
    }

    @Transactional(readOnly = true)
    public List<ChatMessageResponse> getMessages(Long conversationId) {

        return messageRepository
                .findByConversationIdOrderBySentAtAsc(conversationId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ChatMessageResponse toResponse(ChatMessage message) {

        return new ChatMessageResponse(
                message.getId(),
                message.getConversation().getId(),
                message.getSender().getId(),
                message.getContent(),
                message.getSentAt()
        );
    }
}