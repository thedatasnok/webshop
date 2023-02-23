CREATE TABLE category (
  category_id INT GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,

  PRIMARY KEY (category_id)
);
