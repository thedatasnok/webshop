CREATE TABLE product_price (
  product_price_id BIGINT GENERATED ALWAYS AS IDENTITY,
  fk_product_id BIGINT NOT NULL,
  price NUMERIC NOT NULL,
  is_discount BOOLEAN NOT NULL DEFAULT FALSE,
  from TIMESTAMP NOT NULL DEFAULT NOW(),
  to TIMESTAMP,

  PRIMARY KEY (product_price_id),
  FOREIGN KEY (fk_product_id) REFERENCES product(product_id)
);