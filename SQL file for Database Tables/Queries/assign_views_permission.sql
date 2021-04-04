------------------------------------------------ Tasfik Rahman starts -------------------------------------------------------------------

create table user_view
(
	view_name varchar2(100),
	email varchar2(100)
constraint user_requests_pk primary key(email,view_name)
);

insert into user_view values
(
'person_info_view',
'wazed@gmail.com'
);

insert into user_view values
(
'person_contacts_view',
'zenith@gmail.com'
);

insert into user_view values
(
'person_after_1990_view',
'niloy@gmail.com'
);


insert into user_view values
(
'person_after_1990_view',
'tahsin@gmail.com'
);
insert into user_view values
(
'person_contacts_view',
'tahsin@gmail.com'
);


insert into user_view values
(
'person_info_view',
'wazed@gmail.com'
);

insert into user_view values
(
'person_after_1990_view',
'wazed@gmail.com'
);
------------------------------------------------ Tasfik Rahman ends  -------------------------------------------------------------------
