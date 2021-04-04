------------------------------------------------ Tasfik Rahman starts -------------------------------------------------------------------

create table financial_aid
(
record_no varchar2(100),
request varchar2(100),
req_amount number,
granted_amount number,
cause   varchar2(100),
person_id varchar2(35),
constraint financial_aid_pk primary key(record_no),
constraint financial_aid_fk foreign key(person_id) references person(person_id) on delete cascade

)
create sequence financial_aid_seq
start with 101
increment by 1
nocycle

insert into financial_aid values(concat('f_',to_char(financial_aid_seq.nextval)),'Pending',10000,0,'Poor financial situation','P5004')


-----------------------------------------------------------   All about Funds ----------------------------------------------------------------

create table total_fund
(
amount number
)

insert into total_fund(amount)
select sum(donated_amount) from fund


CREATE OR REPLACE TRIGGER Trigger_Receive_Fund
after insert
ON fund
FOR EACH ROW
BEGIN
update total_fund
set amount =
(select amount from total_fund) + :new.donated_amount;
END;


update total_fund  set amount =  (select amount from total_fund) + 1;



	CREATE or REPLACE TRIGGER Trigger_Give_Fund
	BEFORE UPDATE ON financial_aid
	FOR EACH ROW
	when (new.request = 'granted')
	Declare
	amn int;
	BEGIN
	select amount into amn from total_fund;
	if (amn < :new.granted_amount)
	then
	RAISE_APPLICATION_ERROR (-20343, 'Not Enough Fund');
	else
	update total_fund
	set amount =
	(select amount from total_fund) - :new.granted_amount;
	end if;
	 END;

------------------------------------------------ Tasfik Rahman ends -------------------------------------------------------------------
