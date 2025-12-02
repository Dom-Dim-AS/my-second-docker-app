CREATE TABLE IF NOT EXISTS users
(
    id            BIGSERIAL PRIMARY KEY,
    first_name    VARCHAR(100) NOT NULL,
    last_name     VARCHAR(100) NOT NULL,
    full_name     VARCHAR(201) NOT NULL GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT         NOT NULL,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),
    CHECK (char_length(first_name) BETWEEN 1 AND 100),
    CHECK (char_length(last_name) BETWEEN 1 AND 100)
);
