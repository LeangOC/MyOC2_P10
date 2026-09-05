package com.ycyw.chatpoc.support.entity;

import com.ycyw.chatpoc.user.entity.User;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(
        name = "chat_messages",
        indexes = {
                @Index(
                        name = "idx_chat_messages_conversation_sent_at",
                        columnList = "conversation_id, sent_at"
                )
        }
)
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 2000)
    private String content;

    @Column(nullable = false, updatable = false)
    private Instant sentAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false)
    private ChatConversation conversation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @PrePersist
    protected void onCreate() {
        sentAt = Instant.now();
    }

    public ChatMessage() {
    }

    public ChatMessage(
            ChatConversation conversation,
            User sender,
            String content
    ) {
        this.conversation = conversation;
        this.sender = sender;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getSentAt() {
        return sentAt;
    }

    public ChatConversation getConversation() {
        return conversation;
    }

    public void setConversation(ChatConversation conversation) {
        this.conversation = conversation;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public void setSentAt(Instant sentAt) {this.sentAt = sentAt;}
}