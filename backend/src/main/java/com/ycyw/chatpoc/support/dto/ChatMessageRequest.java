package com.ycyw.chatpoc.support.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ChatMessageRequest {

    @NotNull
    private Long conversationId;

    @NotNull
    private Long senderId;

    @NotBlank
    @Size(max = 2000)
    private String content;

    public ChatMessageRequest() {
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}