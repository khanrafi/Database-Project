------------------------------------------------ Tasfik Rahman starts -------------------------------------------------------------------
CREATE OR REPLACE TRIGGER Trigger_person
after insert
ON person
FOR EACH ROW
BEGIN
insert into mothers_pregnancy_info
(person_id,gravidity,parity)
values(:new.person_id,0,0);
END;
------------------------------------------------ Tasfik Rahman ends -------------------------------------------------------------------
