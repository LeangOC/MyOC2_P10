package com.ycyw.chatpoc.support.dto;

import java.time.Instant;

public class ChatMessageResponse {

    private Long id;
    private Long conversationId;
    private Long senderId;
    private String content;
    private Instant sentAt;

    public ChatMessageResponse() {
    }

    public ChatMessageResponse(
            Long id,
            Long conversationId,
            Long senderId,
            String content,
            Instant sentAt) {

        this.id = id;
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.content = content;
        this.sentAt = sentAt;
    }

    public Long getId() {
        return id;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public String getContent() {
        return content;
    }

    public Instant getSentAt() {
        return sentAt;
    }
}