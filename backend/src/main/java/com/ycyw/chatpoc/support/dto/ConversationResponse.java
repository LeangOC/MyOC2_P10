package com.ycyw.chatpoc.support.dto;

public class ConversationResponse {

    private Long id;
    private Long customerId;
    private Long supportId;
    private String status;

    public ConversationResponse() {
    }

    public ConversationResponse(
            Long id,
            Long customerId,
            Long supportId,
            String status
    ) {
        this.id = id;
        this.customerId = customerId;
        this.supportId = supportId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public Long getSupportId() {
        return supportId;
    }

    public String getStatus() {
        return status;
    }
}