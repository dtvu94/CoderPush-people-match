CREATE TABLE Users (
  id VARCHAR(40),
  title VARCHAR(255),
  last_name VARCHAR(255),
  first_name VARCHAR(255),
  gender VARCHAR(30),
  email VARCHAR(255),
  dob TIMESTAMPTZ,
  register_date TIMESTAMPTZ,
  phone VARCHAR(30),
  picture VARCHAR(255),
  location_id VARCHAR(40),
  UNIQUE (first_name,last_name,email),
  PRIMARY KEY(id)
);

CREATE TABLE Locations (
  id VARCHAR(40),
  street VARCHAR(255),
  city VARCHAR(255),
  lstate VARCHAR(255),
  country VARCHAR(255),
  timezone VARCHAR(10),
  PRIMARY KEY(id)
);

CREATE TABLE ViewedUsers (
  id VARCHAR(40),
  user_id VARCHAR(40),
  viewed_user_id VARCHAR(40),
  is_like BOOLEAN,
  UNIQUE (user_id,viewed_user_id),
  PRIMARY KEY(id)
);

CREATE TABLE UserToken (
  id VARCHAR(40),
  user_id VARCHAR(40),
  token VARCHAR(255),
  expired_at TIMESTAMPTZ,
  UNIQUE (user_id,token),
  PRIMARY KEY(id)
);