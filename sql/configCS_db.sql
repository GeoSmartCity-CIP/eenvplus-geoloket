------
-- config the db voor the gsc-crowdsource application and ad extensions
------

CREATE SCHEMA IF NOT EXISTS topology;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';

CREATE EXTENSION IF NOT EXISTS postgres_fdw WITH SCHEMA public;

COMMENT ON EXTENSION postgres_fdw IS 'foreign-data wrapper for remote PostgreSQL servers';

SET search_path = public, pg_catalog;
SET default_tablespace = '';
SET default_with_oids = false;
