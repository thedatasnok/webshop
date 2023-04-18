CREATE TABLE IF NOT EXISTS product_family (
  product_family_id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  shared_attributes JSONB NOT NULL,
  attribute_map JSONB NOT NULL,

  PRIMARY KEY (product_family_id)
);

CREATE TABLE IF NOT EXISTS product (
  product_id BIGINT GENERATED ALWAYS AS IDENTITY,
  fk_product_family_id BIGINT,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  image_urls JSONB NOT NULL,
  price_guidance NUMERIC,
  defined_attributes JSONB NOT NULL,

  CHECK (price_guidance > 0),

  PRIMARY KEY (product_id),
  FOREIGN KEY (fk_product_family_id) REFERENCES product_family(product_family_id)
);

CREATE TABLE IF NOT EXISTS product_category (
  fk_product_id BIGINT NOT NULL,
  fk_category_id BIGINT NOT NULL,

  PRIMARY KEY (fk_product_id, fk_category_id),
  FOREIGN KEY (fk_product_id) REFERENCES product(product_id),
  FOREIGN KEY (fk_category_id) REFERENCES category(category_id)
);


CREATE TABLE IF NOT EXISTS product_child (
  fk_parent_id BIGINT NOT NULL,
  fk_child_id BIGINT NOT NULL,
  quantity INT NOT NULL,

  CHECK (quantity > 0),
  CHECK (fk_parent_id <> fk_child_id), -- no self-referencing

  PRIMARY KEY (fk_parent_id, fk_child_id),
  FOREIGN KEY (fk_parent_id) REFERENCES product(product_id),
  FOREIGN KEY (fk_child_id) REFERENCES product(product_id)
);

CREATE TABLE IF NOT EXISTS product_price (
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
