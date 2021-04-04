------------------------------------------------ Tasfik Rahman starts -------------------------------------------------------------------

create table doctor_notification
(
notification_id varchar2(100),
message		varchar2(100),
person_id       varchar2(35),
doctor_email	varchar2(35),
constraint doctor_notification_pk primary key(notification_id),
constraint doctor_notification_fk foreign key(person_id) references person(person_id) on delete cascade,
constraint doctor_notification2_fk foreign key(doctor_email) references users(email) on delete cascade
)

create sequence doctor_notification_seq
start with 101
increment by 1
nocycle

insert into doctor_notification values(concat('n_',doctor_notification_seq.nextval),
'I have Prescribed you some medicines. please check your prescribed medicine section.',
'P5004',
'tasfik@gmail.com'
)

insert into doctor_notification values(concat('n_',doctor_notification_seq.nextval),
'I have added some new medications to you. please check your prescribed medicine section.',
'P5004',
'wazed@gmail.com'
)

------------------------------------------------ Tasfik Rahman ends -------------------------------------------------------------------
