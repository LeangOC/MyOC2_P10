package com.ycyw.chatpoc.support.service;

import com.ycyw.chatpoc.support.dto.ChatMessageRequest;
import com.ycyw.chatpoc.support.dto.ChatMessageResponse;
import com.ycyw.chatpoc.support.dto.ConversationResponse;
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

    /**
     * Envoie et sauvegarde un message dans une conversation.
     */
    public ChatMessageResponse sendMessage(ChatMessageRequest request) {

        ChatConversation conversation = conversationRepository
                .findById(request.getConversationId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Conversation introuvable"));

        User sender = userRepository
                .findById(request.getSenderId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Utilisateur introuvable"));

        ChatMessage message = new ChatMessage();

        message.setConversation(conversation);
        message.setSender(sender);
        message.setContent(request.getContent());
        message.setSentAt(Instant.now());

        ChatMessage savedMessage =
                messageRepository.save(message);

        return toResponse(savedMessage);
    }

    /**
     * Ferme une conversation.
     */
    public void closeConversation(Long conversationId) {

        ChatConversation conversation = conversationRepository
                .findById(conversationId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Conversation introuvable"));

        if ("OPEN".equals(conversation.getStatus())) {

            conversation.setStatus("CLOSE");

            conversationRepository.save(conversation);
        }
    }

    /**
     * Récupère l'historique des messages d'une conversation.
     */
    @Transactional(readOnly = true)
    public List<ChatMessageResponse> getMessages(
            Long conversationId) {

        return messageRepository
                .findByConversationIdOrderBySentAtAsc(conversationId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Crée une nouvelle conversation entre un client
     * et le premier conseiller support disponible.
     *
     * Un message d'accueil est automatiquement créé
     * par le conseiller.
     */
    public ConversationResponse createCustomerConversation(
            Long customerId) {

        User customer = userRepository
                .findById(customerId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Client introuvable"));

        User support = userRepository
                .findFirstByRole("SUPPORT")
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Aucun conseiller support disponible"));

        ChatConversation conversation =
                new ChatConversation();

        conversation.setCustomer(customer);
        conversation.setSupport(support);
        conversation.setStatus("OPEN");

        ChatConversation savedConversation =
                conversationRepository.save(conversation);

        /*
         * Message automatique du conseiller support.
         */
        ChatMessage greeting = new ChatMessage();

        greeting.setConversation(savedConversation);
        greeting.setSender(support);
        greeting.setContent(
                "Bonjour "
                        + getCustomerName(customer)
                        + ", que puis-je faire pour vous ?"
        );
        greeting.setSentAt(Instant.now());

        messageRepository.save(greeting);

        return toConversationResponse(savedConversation);
    }

    /**
     * Récupère la conversation ouverte du client.
     *
     * Si aucune conversation n'existe, une nouvelle
     * conversation est créée avec un conseiller support.
     */
    public ConversationResponse getOrCreateCustomerConversation(
            Long customerId) {

        List<ChatConversation> conversations =
                conversationRepository
                        .findByCustomerIdOrderByCreatedAtDesc(
                                customerId);

        /*
         * On recherche en priorité une conversation ouverte.
         */
        for (ChatConversation conversation : conversations) {

            if ("OPEN".equals(conversation.getStatus())) {

                return toConversationResponse(conversation);
            }
        }

        /*
         * Aucune conversation ouverte :
         * création d'une nouvelle conversation.
         */
        return createCustomerConversation(customerId);
    }

    /**
     * Récupère les conversations d'un conseiller support.
     */
    @Transactional(readOnly = true)
    public List<ConversationResponse> getSupportConversations(
            Long supportId) {

        return conversationRepository
                .findBySupportIdOrderByCreatedAtDesc(supportId)
                .stream()
                .map(this::toConversationResponse)
                .toList();
    }

    /**
     * Convertit une entité ChatMessage en DTO.
     */
    private ChatMessageResponse toResponse(
            ChatMessage message) {

        User sender = message.getSender();

        return new ChatMessageResponse(
                message.getId(),
                message.getConversation().getId(),
                sender.getId(),
                sender.getEmail(),
                sender.getRole(),
                message.getContent(),
                message.getSentAt()
        );
    }

    /**
     * Convertit une entité ChatConversation en DTO.
     */
    private ConversationResponse toConversationResponse(
            ChatConversation conversation) {

        return new ConversationResponse(
                conversation.getId(),
                conversation.getCustomer().getId(),
                conversation.getSupport() != null
                        ? conversation.getSupport().getId()
                        : null,
                conversation.getStatus()
        );
    }

    /**
     * Récupère le nom affiché du client.
     *
     * Pour l'instant, le PoC utilise l'email.
     * Lorsque Profile sera intégré au PoC,
     * cette méthode pourra retourner le prénom.
     */
    private String getCustomerName(User customer) {

        if (customer.getEmail() == null ||
                customer.getEmail().isBlank()) {

            return "client";
        }

        return customer.getEmail()
                .substring(
                        0,
                        customer.getEmail().indexOf("@")
                );
    }
}
