CREATE TABLE category (
  category_id INT GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,
  icon_url TEXT,

  PRIMARY KEY (category_id)
);
