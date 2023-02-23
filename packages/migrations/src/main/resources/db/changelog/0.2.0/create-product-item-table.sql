CREATE TABLE product_item (
  fk_product_id BIGINT NOT NULL,
  fk_item_id BIGINT NOT NULL,
  quantity INT NOT NULL,

  CHECK (quantity > 0),

  PRIMARY KEY (fk_product_id, fk_item_id),
  FOREIGN KEY (fk_product_id) REFERENCES product(product_id),
  FOREIGN KEY (fk_item_id) REFERENCES item(item_id)
);
