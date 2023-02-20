CREATE TABLE user_account_role (
  role_id INT GENERATED ALWAYS AS IDENTITY,
  name TEXT UNIQUE NOT NULL,

  PRIMARY KEY (role_id)
);
