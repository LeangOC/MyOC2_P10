package com.ycyw.chatpoc.support.repository;

import com.ycyw.chatpoc.support.entity.ChatConversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatConversationRepository
        extends JpaRepository<ChatConversation, Long> {

    List<ChatConversation> findByCustomerIdOrderByCreatedAtDesc(Long customerId);

    List<ChatConversation> findBySupportIdOrderByCreatedAtDesc(Long supportId);
}