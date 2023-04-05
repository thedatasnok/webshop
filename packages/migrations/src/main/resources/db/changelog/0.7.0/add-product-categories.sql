CREATE TABLE product_category (
  fk_product_id BIGINT NOT NULL,
  fk_category_id BIGINT NOT NULL,

  PRIMARY KEY (fk_product_id, fk_category_id),
  FOREIGN KEY (fk_product_id) REFERENCES product(product_id),
  FOREIGN KEY (fk_category_id) REFERENCES category(category_id)
);
