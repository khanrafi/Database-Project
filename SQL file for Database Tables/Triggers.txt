CREATE OR REPLACE TRIGGER TriggerDisease
before INSERT
ON disease
FOR EACH ROW
BEGIN
insert into medicine(
	person_id,
	prescribed_medicine,
	illness_curing
)
select          person_id,
		treatment_taken,
		disease_name
from disease join disease_history using(disease_id);
END;


CREATE OR REPLACE TRIGGER TriggerFormerUsers
before delete of name
ON user_requests
FOR EACH ROW
BEGIN
insert into former_users  
values(
	:old.name,
	:old.password,
	:old.email,
	:old.role
);
END;


delete from users where email='tahsin@gmail.com'
delete from users where name ='Rafi'