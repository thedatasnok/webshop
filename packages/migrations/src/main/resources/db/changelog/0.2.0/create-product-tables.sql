CREATE TABLE product (
  product_id BIGINT GENERATED ALWAYS AS IDENTITY,
  description TEXT,
  image_urls JSON,

  PRIMARY KEY (product_id)
);

CREATE TABLE product_item (
  fk_product_id BIGINT NOT NULL,
  fk_item_id BIGINT NOT NULL,
  quantity INT NOT NULL,

  CHECK (quantity > 0),

  PRIMARY KEY (fk_product_id, fk_item_id),
  FOREIGN KEY (fk_product_id) REFERENCES product(product_id),
  FOREIGN KEY (fk_item_id) REFERENCES item(item_id)
);

CREATE TABLE product_price (
  product_price_id BIGINT GENERATED ALWAYS AS IDENTITY,
  fk_product_id BIGINT NOT NULL,
  price NUMERIC NOT NULL,
  is_discount BOOLEAN NOT NULL DEFAULT FALSE,
  time_from TIMESTAMP NOT NULL DEFAULT NOW(),
  time_to TIMESTAMP,

  CHECK (price > 0),
  CHECK (time_from < time_to),

  PRIMARY KEY (product_price_id),
  FOREIGN KEY (fk_product_id) REFERENCES product(product_id)
);