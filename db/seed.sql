
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

create table messages (
    message_identifier varchar(100),
    message varchar(1000),
    sender int references work_users(id),
    time timestamp
)