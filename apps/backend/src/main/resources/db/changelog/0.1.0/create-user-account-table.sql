CREATE TABLE user_account (
  user_account_id UUID DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  fk_role_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP,

  PRIMARY KEY (user_account_id),
  FOREIGN KEY (fk_role_id) REFERENCES user_account_role(role_id)
);
