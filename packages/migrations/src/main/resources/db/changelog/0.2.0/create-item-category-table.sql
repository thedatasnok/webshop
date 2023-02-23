CREATE TABLE item_category (
  fk_item_id BIGINT NOT NULL,
  fk_category_id INT NOT NULL,

  PRIMARY KEY (fk_item_id, fk_category_id),
  FOREIGN KEY (fk_item_id) REFERENCES item(item_id),
  FOREIGN KEY (fk_category_id) REFERENCES category(category_id)
);
