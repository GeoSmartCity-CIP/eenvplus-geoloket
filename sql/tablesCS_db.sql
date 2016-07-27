--
-- Create the tables and add initial data for the GSC crowdsource app
--
BEGIN;
SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

---------
-- create tables:
----------

CREATE TABLE comment (
    id integer NOT NULL,
    event integer NOT NULL,
    text character varying,
    "user" character varying,
    datetime timestamp with time zone
);

CREATE SEQUENCE comments_event_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE comments_event_seq OWNED BY comment.event;

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE comments_id_seq OWNED BY comment.id;

CREATE TABLE event (
    uuid uuid NOT NULL,
    description character varying,
    "user" character varying,
    status character varying,
    priority character varying,
    datetime timestamp with time zone,
    id integer NOT NULL,
    location geometry,
    tags text[]
);

CREATE SEQUENCE event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE event_id_seq OWNED BY event.id;

CREATE TABLE media (
    uuid uuid,
    mime_type text,
    encoding text,
    data bytea,
    id integer NOT NULL,
    event_id integer NOT NULL
);

CREATE SEQUENCE media_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE media_event_id_seq OWNED BY media.event_id;

CREATE SEQUENCE media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE media_id_seq OWNED BY media.id;

CREATE TABLE mime_type (
    mime_type text NOT NULL
);

CREATE TABLE priority (
    priority text NOT NULL,
    "default" boolean DEFAULT false
);

CREATE TABLE property (
    key character varying NOT NULL,
    value character varying
);

CREATE TABLE status (
    status text NOT NULL
);

CREATE TABLE tag (
    id integer NOT NULL,
    tag text
);

CREATE SEQUENCE tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE tags_id_seq OWNED BY tag.id;

CREATE TABLE "user" (
    id character varying NOT NULL,
    email character varying,
    role character varying,
    organization character varying,
    password character varying
);

ALTER TABLE ONLY comment ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);

ALTER TABLE ONLY comment ALTER COLUMN event SET DEFAULT nextval('comments_event_seq'::regclass);

ALTER TABLE ONLY event ALTER COLUMN id SET DEFAULT nextval('event_id_seq'::regclass);

ALTER TABLE ONLY media ALTER COLUMN id SET DEFAULT nextval('media_id_seq'::regclass);

ALTER TABLE ONLY media ALTER COLUMN event_id SET DEFAULT nextval('media_event_id_seq'::regclass);

ALTER TABLE ONLY tag ALTER COLUMN id SET DEFAULT nextval('tags_id_seq'::regclass);

ALTER TABLE ONLY comment
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);

ALTER TABLE ONLY event
    ADD CONSTRAINT event_pk PRIMARY KEY (id);

ALTER TABLE ONLY media
    ADD CONSTRAINT media_pk PRIMARY KEY (id);

ALTER TABLE ONLY mime_type
    ADD CONSTRAINT mime_type_pkey PRIMARY KEY (mime_type);

ALTER TABLE ONLY priority
    ADD CONSTRAINT priority_pkey PRIMARY KEY (priority);

ALTER TABLE ONLY property
    ADD CONSTRAINT properties_pkey PRIMARY KEY (key);

ALTER TABLE ONLY status
    ADD CONSTRAINT status_pkey PRIMARY KEY (status);

ALTER TABLE ONLY tag
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY media
    ADD CONSTRAINT event_id FOREIGN KEY (event_id) REFERENCES event(id);

ALTER TABLE ONLY comment
    ADD CONSTRAINT event_id FOREIGN KEY (event) REFERENCES event(id);

ALTER TABLE ONLY event
    ADD CONSTRAINT user_id FOREIGN KEY ("user") REFERENCES "user"(id);

ALTER TABLE ONLY comment
    ADD CONSTRAINT user_id FOREIGN KEY ("user") REFERENCES "user"(id);

---------
-- grant rights
----------

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;

-- too grant rights to users use this:
-----------
-- REVOKE ALL ON SCHEMA public FROM <username>;
-- GRANT ALL ON SCHEMA public TO <username>;

---------
-- populate tables with initial data:
----------

--mime_type
INSERT INTO "public"."mime_type" ("mime_type") VALUES ('image/jpeg');

--priority
INSERT INTO "public"."priority" ("priority", "default") VALUES ('normal', 't');
INSERT INTO "public"."priority" ("priority", "default") VALUES ('low', 'f');
INSERT INTO "public"."priority" ("priority", "default") VALUES ('high', 'f');

--property
INSERT INTO "public"."property" ("key", "value") VALUES ('priority-default', 'normal');
INSERT INTO "public"."property" ("key", "value") VALUES ('status-default', 'submitted');
INSERT INTO "public"."property" ("key", "value") VALUES ('login-required', 'false');

--status
INSERT INTO "public"."status" ("status") VALUES ('submitted');
INSERT INTO "public"."status" ("status") VALUES ('assigned');
INSERT INTO "public"."status" ("status") VALUES ('solved');
INSERT INTO "public"."status" ("status") VALUES ('closed');

--tag
INSERT INTO "public"."tag" ("id" , "tag") VALUES (1, 'water rupture');
INSERT INTO "public"."tag" ("id" , "tag") VALUES (2, 'sewage obstruction');

COMMIT;
