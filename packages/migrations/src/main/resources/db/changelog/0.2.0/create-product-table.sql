CREATE TABLE product (
  product_id BIGINT GENERATED ALWAYS AS IDENTITY,
  description TEXT,
  image_urls JSON,

  PRIMARY KEY (product_id)
);
