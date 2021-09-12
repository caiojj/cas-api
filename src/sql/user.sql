CREATE TABLE user (
    id UUID PRIMARY KEY, 
    name text,
    lastName text,
    uriProfile text,
    email text,
    password text,
    createAt timestamp 
);