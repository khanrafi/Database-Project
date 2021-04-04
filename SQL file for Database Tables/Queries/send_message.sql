------------------------------------------------ Tasfik Rahman starts -------------------------------------------------------------------

create table send_message
(
msg_id varchar2(100),
message varchar2(100),
person_id varchar2(35),
doctor_email varchar2(100),
constraint send_message_pk primary key(msg_id),
constraint send_message_fk foreign key(person_id) references person(person_id) on delete cascade,
constraint send_message2_fk foreign key(doctor_email) references users(email) on delete cascade
)

create sequence send_message_seq
start with 101
increment by 1
nocycle

insert into send_message values(concat('sent_',to_char(send_message_seq.nextval)),
'I am having serious headache for couple of days.Plz suggest me some pain killers',
'P5004',
'tasfik@gmail.com'
)

------------------------------------------------ Tasfik Rahman ends   -------------------------------------------------------------------
