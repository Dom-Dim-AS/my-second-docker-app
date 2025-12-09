CREATE TABLE IF NOT EXISTS users
(
    id                            BIGSERIAL PRIMARY KEY,
    first_name                    VARCHAR(100) NOT NULL,
    last_name                     VARCHAR(100) NOT NULL,
    email                         VARCHAR(255) NOT NULL,
    email_verification_token      VARCHAR(32),
    email_verification_created_at TIMESTAMPTZ DEFAULT NULL,
    email_verified_at             TIMESTAMPTZ DEFAULT NULL,
    phone                         VARCHAR(255) NOT NULL,
    phone_verification_token      INTEGER,
    phone_verification_created_at TIMESTAMPTZ DEFAULT NULL,
    phone_verified_at             TIMESTAMPTZ DEFAULT NULL,
    CHECK (length(phone_verification_token::TEXT) = 8)
);
