
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

create table rooms (
    id serial primary key
);

create table user_chats (
    id serial primary key,
    user_id int references work_users(id),
    chat_id int references rooms(id)
);

create table messages (
    id serial primary key,
    time timestamp,
    sender int references work_users(id),
    room_id int references rooms(id)
)