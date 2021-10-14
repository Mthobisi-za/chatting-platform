create table users(
    username text not null, password text not null, age int, gender text, contact text, profile text, id seriel primary key
);
create table chats(
    messages text not null
);