------------------------------------------------ Tasfik Rahman starts -------------------------------------------------------------------
create table users
(
	name varchar2(100) not null,
	password varchar2(100) not null,
	email varchar2(100) not null,
	role varchar2(100) not null,
constraint users_pk primary key(email)
);


insert into users values ('Tasfik','tasfik123','tasfik2@gmail.com','ADMIN');
insert into users values ('Tasfik','tasfik123','tasfik@gmail.com','DEVELOPER');
insert into users values ('Wazed','wazed123','wazed@gmail.com','DEVELOPER');




create table user_requests
(
	name varchar2(100) not null,
	password varchar2(100) not null,
	email varchar2(100) not null,
	role varchar2(100) not null,
	permission varchar2(100) not null,
constraint user_requests_pk primary key(email )
);

insert into user_requests values ('Tahsin','tahsin123','tahsin@gmail.com','DEVELOPER','DENIED');
insert into user_requests values ('Zenith','zenith123','zenith@gmail.com','DEVELOPER','DENIED');
insert into user_requests values ('Rafi','rafi123','rafi@gmail.com','DEVELOPER','DENIED');



CREATE OR REPLACE TRIGGER TriggerUsers
after update of permission
ON user_requests
FOR EACH ROW
when (new.permission = 'GRANTED')
BEGIN
insert into users
values(
:old.name,
:old.password,
:old.email,
:old.role
);
END;

------------------------------------------------ Tasfik Rahman ends   -------------------------------------------------------------------
