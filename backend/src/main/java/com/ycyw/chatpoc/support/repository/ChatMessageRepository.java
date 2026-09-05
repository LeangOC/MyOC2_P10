package com.ycyw.chatpoc.support.repository;

import com.ycyw.chatpoc.support.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository
        extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByConversationIdOrderBySentAtAsc(
            Long conversationId
    );
}