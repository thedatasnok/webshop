CREATE TYPE webshop_shipping_method AS ENUM (
  'INSTANT_TELEPORTATION',
  'DRONE',
  'SELF_DRIVING_TRUCK',
  'HYPERLOOP'
);

ALTER TABLE "order" ADD COLUMN shipping_method webshop_shipping_method NOT NULL;
