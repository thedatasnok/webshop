CREATE TYPE webshop_order_status AS ENUM (
  'NEW',
  'IN_PROGRESS',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED'
);

CREATE TYPE webshop_payment_status AS ENUM (
  'NEW',
  'IN_PROGRESS',
  'PAID',
  'CANCELLED'
);

CREATE TYPE webshop_payment_method AS ENUM (
  'BIOMETRIC',
  'CRYPTO',
  'VIRTUAL_WALLET',
  'SMART_CONTRACT',
  'CREDIT_CARD'
);

CREATE TYPE webshop_shipping_method AS ENUM (
  'INSTANT_TELEPORTATION',
  'DRONE',
  'SELF_DRIVING_TRUCK',
  'HYPERLOOP'
);

CREATE TABLE "order" (
  order_id BIGINT GENERATED ALWAYS AS IDENTITY,

  ordered_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

  order_status webshop_order_status NOT NULL,
  payment_status webshop_payment_status NOT NULL,
  payment_method webshop_payment_method NOT NULL,
  shipping_method webshop_shipping_method NOT NULL,

  fk_customer_id UUID,

  -- These fields are copied from the customers account at the time of order
  -- We keep them here in case the customer deletes their account
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,

  -- Delivery address
  delivery_country TEXT,
  delivery_postal_code TEXT,
  delivery_city TEXT,
  delivery_street TEXT,
  delivery_care_of TEXT,

  -- Invoice address
  invoice_country TEXT,
  invoice_postal_code TEXT,
  invoice_city TEXT,
  invoice_street TEXT,
  invoice_care_of TEXT,

  PRIMARY KEY (order_id),
  FOREIGN KEY (fk_customer_id) REFERENCES user_account(user_account_id) ON DELETE SET NULL
);

CREATE TABLE order_line (
  order_line_id BIGINT GENERATED ALWAYS AS IDENTITY,
  fk_order_id BIGINT NOT NULL,
  fk_product_id BIGINT NOT NULL,
  fk_product_price_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  subtotal NUMERIC,

  CHECK (quantity > 0),

  PRIMARY KEY (order_line_id),
  FOREIGN KEY (fk_order_id) REFERENCES "order"(order_id),
  FOREIGN KEY (fk_product_id) REFERENCES product(product_id),
  FOREIGN KEY (fk_product_price_id) REFERENCES product_price(product_price_id)
);

