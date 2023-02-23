CREATE TABLE item_family (
  item_family_id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL, 
  description TEXT,
  shared_attributes JSON,
  attribute_map JSON,

  PRIMARY KEY (item_family_id)
);

CREATE TABLE item (
  item_id BIGINT GENERATED ALWAYS AS IDENTITY,
  fk_item_family_id BIGINT,
  name TEXT NOT NULL,
  description TEXT,
  price_guidance NUMERIC,
  defined_attributes JSON,

  PRIMARY KEY (item_id),
  FOREIGN KEY (fk_item_family_id) REFERENCES item_family(item_family_id)
);

CREATE TABLE item_category (
  fk_item_id BIGINT NOT NULL,
  fk_category_id INT NOT NULL,

  PRIMARY KEY (fk_item_id, fk_category_id),
  FOREIGN KEY (fk_item_id) REFERENCES item(item_id),
  FOREIGN KEY (fk_category_id) REFERENCES category(category_id)
);