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
