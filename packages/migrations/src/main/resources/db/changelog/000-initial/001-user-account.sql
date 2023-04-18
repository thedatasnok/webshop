DO $$ BEGIN
  CREATE TYPE user_account_role AS ENUM ('SHOP_OWNER', 'SHOP_WORKER', 'CUSTOMER');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS user_account  (
  user_account_id UUID DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  role user_account_role NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP,

  PRIMARY KEY (user_account_id)
);
