CREATE TABLE product_child (
  fk_parent_id BIGINT NOT NULL,
  fk_child_id BIGINT NOT NULL,
  quantity INT NOT NULL,

  CHECK (quantity > 0),
  CHECK (fk_parent_id <> fk_child_id), -- no self-referencing

  PRIMARY KEY (fk_parent_id, fk_child_id),
  FOREIGN KEY (fk_parent_id) REFERENCES product(product_id),
  FOREIGN KEY (fk_child_id) REFERENCES product(product_id)
);
