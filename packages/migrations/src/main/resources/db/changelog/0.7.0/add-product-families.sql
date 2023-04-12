CREATE TABLE product_family (
  product_family_id BIGINT GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  shared_attributes JSON,
  attribute_map JSON,

  PRIMARY KEY (product_family_id)
);

ALTER TABLE product ADD COLUMN fk_product_family_id BIGINT;
ALTER TABLE product ADD CONSTRAINT product_family_fk_product_family_id_fkey FOREIGN KEY (fk_product_family_id) REFERENCES product_family(product_family_id);
ALTER TABLE product ADD COLUMN short_name TEXT;
ALTER TABLE product ADD COLUMN price_guidance NUMERIC;
ALTER TABLE product ADD CONSTRAINT product_family_price_guidance_check CHECK (price_guidance > 0);
ALTER TABLE product ADD COLUMN defined_attributes JSON;
