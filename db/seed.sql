drop table if exists work_users;
drop table if exists company;

create table company (
    id serial primary key,
    name varchar(100),
    access_code varchar(10)
);

create table work_users (
    id serial primary key,
    firstname varchar(40),
    lastname varchar(40),
    email varchar(60),
    password varchar(500),
    profile_pic text,
    is_admin boolean,
    company_id int references company(id)
);