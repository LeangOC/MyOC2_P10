package com.ycyw.chatpoc.support.dto;

public class ConversationResponse {

    private Long id;
    private Long userId;
    private String status;

    public ConversationResponse() {
    }

    public ConversationResponse(Long id, Long userId, String status) {
        this.id = id;
        this.userId = userId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getStatus() {
        return status;
    }
}