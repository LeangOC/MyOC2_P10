-- ============================================================
-- YCYW - Your Car Your Way
-- Création du modèle de données PostgreSQL
-- ============================================================


-- ============================================================
-- 1. TABLE : agency
-- ============================================================

CREATE TABLE agency (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    city        VARCHAR(100) NOT NULL,
    country     VARCHAR(100) NOT NULL
);


-- ============================================================
-- 2. TABLE : vehicle_category
-- ============================================================

CREATE TABLE vehicle_category (
    code        VARCHAR(20) PRIMARY KEY,
    label       VARCHAR(255) NOT NULL
);


-- ============================================================
-- 3. TABLE : users
-- ============================================================

CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    email       VARCHAR(255) NOT NULL UNIQUE,
    username    VARCHAR(100),
    password    VARCHAR(255) NOT NULL
);


-- ============================================================
-- 4. TABLE : profile
-- ============================================================

CREATE TABLE profile (
    id                  BIGSERIAL PRIMARY KEY,
    user_id             BIGINT NOT NULL UNIQUE,
    first_name          VARCHAR(100),
    last_name           VARCHAR(100),
    birth_date          DATE,
    address             VARCHAR(500),
    locale              VARCHAR(10),
    email_enable        BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_profile_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 5. TABLE : vehicle
-- ============================================================

CREATE TABLE vehicle (
    id                    BIGSERIAL PRIMARY KEY,
    registration           VARCHAR(50) NOT NULL UNIQUE,
    brand                  VARCHAR(100) NOT NULL,
    model                  VARCHAR(100) NOT NULL,
    acriss_code            VARCHAR(20),

    agency_id              BIGINT NOT NULL,
    vehicle_cat_code  VARCHAR(20) NOT NULL,

    CONSTRAINT fk_vehicle_agency
        FOREIGN KEY (agency_id)
        REFERENCES agency(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_vehicle_category
        FOREIGN KEY (vehicle_cat_code)
        REFERENCES vehicle_category(code)
        ON DELETE RESTRICT
);


-- ============================================================
-- 6. TABLE : offer
-- ============================================================

CREATE TABLE offer (
    id              BIGSERIAL PRIMARY KEY,
    departure_city  VARCHAR(100) NOT NULL,
    return_city     VARCHAR(100) NOT NULL,
    start_at        TIMESTAMP WITH TIME ZONE NOT NULL,
    end_at          TIMESTAMP WITH TIME ZONE NOT NULL,
    price           NUMERIC(12,2) NOT NULL,
    status          VARCHAR(50) NOT NULL,

    vehicle_id      BIGINT NOT NULL,

    CONSTRAINT fk_offer_vehicle
        FOREIGN KEY (vehicle_id)
        REFERENCES vehicle(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_offer_dates
        CHECK (end_at > start_at),

    CONSTRAINT chk_offer_price
        CHECK (price >= 0)
);


-- ============================================================
-- 7. TABLE : reservation
-- ============================================================

CREATE TABLE reservation (
    id              BIGSERIAL PRIMARY KEY,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status          VARCHAR(50) NOT NULL,
    total_price     NUMERIC(12,2) NOT NULL,
    user_id         BIGINT NOT NULL,
    offer_id        BIGINT NOT NULL,

    CONSTRAINT fk_reservation_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_reservation_offer
        FOREIGN KEY (offer_id)
        REFERENCES offer(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_reservation_price
        CHECK (total_price >= 0)
);


-- ============================================================
-- 8. TABLE : payment
-- ============================================================

CREATE TABLE payment (
    id                  BIGSERIAL PRIMARY KEY,
    provider            VARCHAR(50) NOT NULL,
    external_payment_id VARCHAR(255),
    amount              NUMERIC(12,2) NOT NULL,
    status              VARCHAR(50) NOT NULL,

    reservation_id      BIGINT NOT NULL,

    CONSTRAINT fk_payment_reservation
        FOREIGN KEY (reservation_id)
        REFERENCES reservation(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_payment_amount
        CHECK (amount >= 0)
);


-- ============================================================
-- 9. TABLE : refund
-- ============================================================

CREATE TABLE refund (
    id              BIGSERIAL PRIMARY KEY,
    amount          NUMERIC(12,2) NOT NULL,
    reason          VARCHAR(500),
    status          VARCHAR(50) NOT NULL,

    payment_id      BIGINT NOT NULL,

    CONSTRAINT fk_refund_payment
        FOREIGN KEY (payment_id)
        REFERENCES payment(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_refund_amount
        CHECK (amount >= 0)
);


-- ============================================================
-- 10. TABLE : chat_conversation
-- ============================================================

CREATE TABLE chat_conversation (
    id          BIGSERIAL PRIMARY KEY,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status      VARCHAR(50) NOT NULL,

    customer_id BIGINT NOT NULL,
    support_id  BIGINT NOT NULL,

    CONSTRAINT fk_chat_conversation_customer
        FOREIGN KEY (customer_id)
        REFERENCES users(id),

    CONSTRAINT fk_chat_conversation_support
        FOREIGN KEY (support_id)
        REFERENCES users(id)
);


-- ============================================================
-- 11. TABLE : chat_message
-- ============================================================

CREATE TABLE chat_message (
    id              BIGSERIAL PRIMARY KEY,
    content         VARCHAR(2000) NOT NULL,
    sent_at         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    conversation_id BIGINT NOT NULL,
    sender_id       BIGINT NOT NULL,

    CONSTRAINT fk_chat_message_conversation
        FOREIGN KEY (conversation_id)
        REFERENCES chat_conversation(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_chat_message_sender
        FOREIGN KEY (sender_id)
        REFERENCES users(id)
);


-- ============================================================
-- INDEX
-- ============================================================

CREATE INDEX idx_vehicle_agency
    ON vehicle(agency_id);

CREATE INDEX idx_vehicle_category
    ON vehicle(vehicle_cat_code);

CREATE INDEX idx_offer_vehicle
    ON offer(vehicle_id);

CREATE INDEX idx_offer_dates
    ON offer(start_at, end_at);

CREATE INDEX idx_offer_departure_city
    ON offer(departure_city);

CREATE INDEX idx_offer_return_city
    ON offer(return_city);

CREATE INDEX idx_reservation_user
    ON reservation(user_id);

CREATE INDEX idx_reservation_offer
    ON reservation(offer_id);

CREATE INDEX idx_reservation_status
    ON reservation(status);

CREATE INDEX idx_payment_reservation
    ON payment(reservation_id);

CREATE INDEX idx_refund_payment
    ON refund(payment_id);

CREATE INDEX idx_chat_conversation_customer
    ON chat_conversation(customer_id);

CREATE INDEX idx_chat_conversation_support
    ON chat_conversation(support_id);

CREATE INDEX idx_chat_message_conversation
    ON chat_message(conversation_id);

CREATE INDEX idx_chat_message_sender
    ON chat_message(sender_id);

CREATE INDEX idx_chat_message_sent_at
    ON chat_message(sent_at);


-- ============================================================
-- FIN
-- ============================================================