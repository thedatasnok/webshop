ALTER TYPE webshop_payment_method RENAME TO webshop_payment_method_old;

CREATE TYPE webshop_payment_method AS ENUM (
  'BIOMETRIC',
  'CRYPTO',
  'VIRTUAL_WALLET',
  'SMART_CONTRACT',
  'CREDIT_CARD'
);

ALTER TABLE "order" ALTER COLUMN payment_method TYPE webshop_payment_method USING payment_method::text::webshop_payment_method;

DROP TYPE webshop_payment_method_old;
