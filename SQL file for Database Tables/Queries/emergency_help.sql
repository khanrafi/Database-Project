------------------------------------------------ Tasfik Rahman starts -------------------------------------------------------------------

create table emergency_help
(
case_id varchar2(35),
person_id varchar2(35),
status 	  varchar2(35),
volunteer_email  varchar2(35),
constraint emergency_help_pk primary key(case_id),
constraint emergency_help_fk foreign key(person_id) references person(person_id) on delete cascade,
constraint emergency_help_assist_fk foreign key(volunteer_email) references users(email) on delete cascade
)

insert into emergency_help(case_id,person_id,status) values('case102','P5004','unsafe')



CREATE OR REPLACE TRIGGER Trigger_emergency
after insert
ON emergency_help
FOR EACH ROW
BEGIN
insert into during_pregnancy_report
values(
:old.person_id,
sysdate,
concat('PP00',to_char(patient_id_seq.nextval)));
END;


update emergency_help set status='safe' , vlunteer_email='wazed@gmail.com' where person_id='P5004'

create sequence emergency_help_seq
start with 103
increment by 1
nocycle

------------------------------------------------ Tasfik Rahman ends -------------------------------------------------------------------
