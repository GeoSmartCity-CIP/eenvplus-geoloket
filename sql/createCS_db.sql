SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

DROP DATABASE IF EXISTS cs;

CREATE DATABASE cs
  WITH OWNER = cs
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'Dutch_Belgium.1252'
       LC_CTYPE = 'Dutch_Belgium.1252'
       CONNECTION LIMIT = -1;

ALTER DATABASE cs
  SET search_path = "$user", public, topology;

COMMENT ON DATABASE cs IS 'Crowd-sourcing';
