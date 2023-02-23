CREATE TABLE item_family (
  item_family_id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL, 
  description TEXT,
  shared_attributes JSON,
  attribute_map JSON

  PRIMARY KEY (item_family_id)
);
