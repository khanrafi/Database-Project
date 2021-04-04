--------------------------------------------------   Wazed Rifat  ---------------------------------------------------------
create table sequence_record(
	sequence_name varchar2(100),
	table_name varchar2(100),
	column_name varchar2(100),
	prefix varchar2(50)
);

insert into sequence_record values('person_id_Seq', 'PERSON', 'PERSON_ID', 'P500');
insert into sequence_record values('social_id_Seq', 'SOCIO_ECONOMIC_HISTORY', 'SOCIAL_ID', 'SO0');
insert into sequence_record values('disease_id_Seq', 'DISEASE', 'DISEASE_ID', '');
insert into sequence_record values('service_id_Seq', 'EMERGENCY_MEDICAL_SUPPORT', 'SERVICE_ID', '');
insert into sequence_record values('education_id_Seq', 'EDUCATION', 'EDUCATION_ID', '');
insert into sequence_record values('record_no_Seq', 'FUND', 'RECORD_NO', 'T00');
insert into sequence_record values('supply_id_Seq', 'SUPPLY_AND_LOGISTICS', 'SUPPLY_ID', '');
insert into sequence_record values('patient_id_Seq', 'DURING_PREGNANCY_REPORT', 'PATIENT_ID', '');






declare
	uc float(2) := 0;
	o float(2) := 0;
	dc float(2) := 0;
	cw float(2) := 0;
	tot float(2) := 0;
begin
	select count(*)
	into uc
	from uprooted_child;

	select count(*)
	into o
	from Orphan;

	select count(*)
	into dc
	from disabled_child;

	select count(*)
	into cw
	from child_worker;

	tot := uc + o + dc + cw;

	dbms_output.put_line('uprooted child is ' || uc/tot*100 || '% of total child0');
	dbms_output.put_line('orphan child is ' || o/tot*100 || '% of total child0');
	dbms_output.put_line('disabled child is ' || dc/tot*100 || '% of total child0');
	dbms_output.put_line('child worker is ' || cw/tot*100 || '% of total child0');
end;



create or replace procedure child_death_per_year_reason
(reason IN OUT varchar2, result IN OUT number)
as
begin
select count(*)
into result
from child_death_record
where CAUSE_OF_DEATH = reason
and MONTHS_between(sysdate, DATE_OF_DEATH) <= 12;
end;



create or replace view average_fund_view
as
select p.person_id "person_id", sum(spent_amount) "total"
from person p, socio_economic_history seh, financial_support fs, Fund f
	where	p.person_id = seh.person_id
		And seh.social_id = fs.social_id
		and fs.record_no = f.record_no
	group by p.person_id;


create or replace function average_fund
return number
as
res number;
begin
select avg( "total" )
into res
from average_fund_view;

dbms_output.put_line(res);
return res;
end;

declare
	avg_fund number;
begin
	avg_fund := average_fund();
	select p.name
	from person p, socio_economic_history seh, financial_support fs, Fund f
	where	p.person_id = seh.person_id
		And seh.social_id = fs.social_id
		and fs.record_no = f.record_no
		and avg_fund < (
			select "total"
			from average_fund_view afv
			where "person_id" = p.person_id
		)
end;


declare
	avg_fund number;

	cursor c
	is
	select p.name, p.person_id
	from person p, socio_economic_history seh, financial_support fs, Fund f
	where	p.person_id = seh.person_id
		And seh.social_id = fs.social_id
		and fs.record_no = f.record_no;

	rec c%rowtype;
	val number;
begin
	avg_fund := average_fund();

	open c
	loop
		fetch c into rec;
		exit when c%notfound;

		select "total"
		into val
		from average_fund_view
		where "person_id" = rec.person_id;

		if c.spent_money > val  then
			dbms_output.put_line(c.name || ' got more than average fund. ');
		end if;
	end loop
end;



create or replace procedure transform_table_name
(name in out varchar2)
as
begin
	select replace(name, '_', ' ')
	into name
	from dual;
end;

create or replace trigger sequence_auto_generate
after insert
on sequence_record
for each row
declare
	name varchar2(50);
begin
	name := :new.sequence_name;
	create sequence name
	increment by 1
	start with 1
	maxvalue 1000000
	cache 20
	nocycle;
end;




--------------------------------------------------   Wazed Rifat Ends ---------------------------------------------------------



--------------------------------------------------   Zenith           ---------------------------------------------------------


CREATE OR REPLACE VIEW
REPORT_VIEW1 ("NAME","VISITED DATE","PLATELET COUNT","RBC COUNT","BLOOD PRESSURE","CALCIUM","PROTEIN","IRON") AS
SELECT NAME,during_pregnancy_report.date_of_visit,platelet_count,rbc_count,blood_pressure,calcium,protein,iron
FROM PERSON JOIN during_pregnancy_report USING(PERSON_ID) JOIN blood_test USING(PATIENT_ID) JOIN nutrition_test USING(PATIENT_ID)
WITH READ ONLY CONSTRAINT
View_Read_Only200;


CREATE OR REPLACE VIEW
REPORT_VIEW2 ("NAME","VISITED DATE","WEEK","WEIGHT","ESTIMATED DELIVARY WEEK","BABY'S HEART BEAT COUNT","BABY'S GENDER") AS
SELECT NAME,during_pregnancy_report.date_of_visit,week,weight,possible_week_of_delivary,babys_heart_beat,babys_gender
FROM PERSON JOIN during_pregnancy_report USING(PERSON_ID) JOIN during_pregnancy_weight USING(PATIENT_ID) JOIN ultra_sound_report USING(PATIENT_ID)
WITH READ ONLY CONSTRAINT
View_Read_Only300;


CREATE or REPLACE TRIGGER growth_rate_Trigger
BEFORE UPDATE
ON growth_rate
for each row
BEGIN
dbms_output.put_line('trigger called');
insert into growth_rate111 values(:old.health_record_id,:old.date_of_record,:old.percentage_of_weight,:old.percentage_of_height,:old.percentage_of_hemoglobin,:old.percentage_of_RBC,:old.percentage_of_protein,:old.blood_pressure,:old.immunoglobulin);
END;


CREATE or REPLACE TRIGGER early_marriage_history_Trigger
BEFORE insert or update of victims_age
ON early_marriage_history
for each row
WHEN (New.victims_age>20)
DECLARE
OVER_LOGICAL_LIMIT_ERROR EXCEPTION;
BEGIN
RAISE OVER_LOGICAL_LIMIT_ERROR;
EXCEPTION
WHEN OVER_LOGICAL_LIMIT_ERROR
THEN
RAISE_APPLICATION_ERROR(-20001,'NOT ALLOWED' );
END;


CREATE or REPLACE TRIGGER Orphan_Trigger
BEFORE insert or update
ON Orphan
for each row
WHEN (NEW.date_of_adoption < NEW.mothers_date_of_death and NEW.date_of_adoption < NEW.fathers_date_of_death)
DECLARE
OVER_LOGICAL_LIMIT_ERROR EXCEPTION;
BEGIN
RAISE OVER_LOGICAL_LIMIT_ERROR;
EXCEPTION
WHEN OVER_LOGICAL_LIMIT_ERROR
THEN
RAISE_APPLICATION_ERROR(-20001,'NOT ALLOWED' );
END;



--------------------------------------------------   Zenith Ends ---------------------------------------------------------------



--------------------------------------------------   Rafi Starts ---------------------------------------------------------------

select 'Total No Of Uprooted Child Who Are Addicted Is: '||count(person_id)||' IN '||city as "No Of Uprooted Addicted Child"
from person join child using(person_id) join uprooted_child using(person_id)
where person_id in
(select person_id 
from addicted_child join addiction using(person_id))
group by city;


select name,cast(months_between(TRUNC(sysdate),date_of_birth)/12 as decimal(5,1)) as Age,disease_name,disease_type,vaccine_name,total_dose,prevented_disease,success_rate,total_cost
from disease join disease_history using(disease_id) join person using (person_id) join child using(person_id) join supply_for_child 
using (person_id) join vaccine using(supply_id)
where disease_name in (select disease_name from during_pregnancy_report join pregnancy_disease using(patient_id,date_of_visit)
join disease using (disease_id));

select name as "chld name",concat(PRESERVED_AMOUNT,'Kg') "preserved amount",FOOD_NAME,FOOD_TYPE,concat(TOTAL_CALORIE,'Cal') as "total caloriey",PROVIDER_NAME,PROVIDER_ADDRESS
from person join child using(person_id) join supply_for_child using(person_id) join food using(supply_id)
where name in (
select name
from person join child using(person_id) join shelter using(person_id)
 where establishment_date >= to_date('01-11-2011','DD-MM-YYYY') );


select name,blood_group,gender,DISEASE_TYPE,DISABILITY_OR_DISORDER_NAME AS "DISEASE NAME",AGE_OF_DETECTION,CAUSE,DATE_OF_RECORD,
concat(PERCENTAGE_OF_WEIGHT,'%') as WEIGHT,concat(PERCENTAGE_OF_height,'%') AS HEIGHT,concat(PERCENTAGE_OF_hemoglobin,'%') AS HEMOGLOBIN
,concat(PERCENTAGE_OF_RBC,'%') AS RBC,concat(PERCENTAGE_OF_protein,'%') AS PROTEIN,BLOOD_PRESSURE
from person join child using(person_id) join disabled_child using (person_id) join health_record using(person_id) join growth_rate using(health_record_id) ;

select  name,cast((sysdate-date_of_birth)/365 as decimal(5,1)) as Age,gender,city,concat('Cause For Child Labour : ',cause) 
as Cause,(total_monthly_income*12) as "yearly income",working_area,DAILY_WORK_HOUR as "Working Hour",WORKING_TYPE,BUDGET,
TOTAL_COST,budget-total_cost as "remaining amount",initcap(BOOK_NAME) as "Name Of Book",initcap(BOOK_TYPE) as "Type Of Book"	
from person join child using(person_id) join child_worker using(person_id) join supply_for_child using(person_id) join educational_support using(supply_id)
where book_type in (
select book_type
from person join child using(person_id) join orphan using(person_id) join supply_for_child using(person_id) join educational_support using(supply_id) 
group by book_type
having avg(total_cost) <= all 
(select total_cost 
from person join child using(person_id) join uprooted_child using(person_id) join supply_for_child using(person_id) join educational_support using(supply_id)) );

select  name,fathers_date_of_death,mothers_date_of_death,date_of_adoption,abuse_type,physical_effect
from abuse_effect join child_abuse_history using(case_id) join unexpected_event using(case_id) join 
child_accidents using(case_id) join person using(person_id) join child using(person_id) join orphan using(person_id);


select name,patient_id,date_of_visit,disease_name,disease_type,cause,treatment_taken,doctors_name,hospital_clinic_name ,equipment_no,
equipment_name,total_cost
from person join mothers_pregnancy_info using(person_id) join during_pregnancy_report using(person_id) join pregnancy_disease using(patient_id,date_of_visit)
join disease using (disease_id)join medical_support using(disease_id) join emergency_medical_support using(service_id) join 
emergency_medical_supply using (service_id) join medical_equipment using(supply_id);

select name,GRAVIDITY,PARITY,to_char(LMP_DATE, 'mm-dd-yyyy') as "Last Menstrual Period",PLACE_OF_BIRTH,to_char(CHILD_DATE_OF_BIRTH,'mm-dd-yyyy')
as "Newborn's Date Of Birth",round(WEIGHT),DOCTORS_NAME,HOSPITAL_CLINIC_NAME,DONOR_NAME,DONOR_ADDRESS,DONATED_AMOUNT,spent_amount
from person join mothers_pregnancy_info using(person_id) join save_newborn using(person_id) join 
medical_support_newborn using(birth_reg_no) join emergency_medical_support using(service_id) join fund_emergency_medical using(service_id) join fund using(record_no,transaction_id)
where donated_amount>= 80000;

select name,date_of_visit,gravidity,parity,babys_position,babys_heart_beat,possible_week_of_delivary,hospital_clinic_name
from person join mothers_pregnancy_info using(person_id) join during_pregnancy_report using(person_id) 
join ultra_sound_report using(patient_id,date_of_visit)
where name in (select name from person join mothers_pregnancy_info using(person_id) where gravidity>=2 and parity >=2);

CREATE OR REPLACE VIEW person_view("Person Name","date_of_birth","email_address","blood_group","gender","city","street_name","apartment_no","mobile_no")
as select name,date_of_birth,email_address,blood_group,gender,city,street_name,apartment_no,mobile_no
from person join mobile_no using(person_id);

create or replace view pregnancy_disease_view("name","patient_id","date_of_visit","disease_name","disease_type","cause","treatment_taken","doctors_name","hospital_name")
as select name,patient_id,date_of_visit,disease_name,disease_type,cause,treatment_taken,doctors_name,hospital_clinic_name
from person join mothers_pregnancy_info using(person_id) join during_pregnancy_report using(person_id) join pregnancy_disease using(patient_id,date_of_visit)
join disease using (disease_id)join medical_support using(disease_id) join emergency_medical_support using(service_id)  
WITH READ ONLY CONSTRAINT View_Read_Only;


create or replace view disease_vaccine_view("DISEASE_ID","DISEASE_NAME","DISEASE_TYPE","SYMPTOM","VACCINE_NAME",
"TOTAL_DOSE","PREVENTED_DISEASE","SUCCESS_RATE","SIDE_EFFECTS","INJECTION_METHOD" )
as select DISEASE_ID,DISEASE_NAME,DISEASE_TYPE,SYMPTOM,VACCINE_NAME,concat(TOTAL_DOSE,'mL'),PREVENTED_DISEASE,concat(SUCCESS_RATE,'%'),SIDE_EFFECTS,INJECTION_METHOD 
from disease join medical_support using(disease_id) join emergency_medical_support using(service_id) join emergency_medical_supply using(service_id) join vaccine using(supply_id);


create or replace view child_growth_view("name","blood_group","weight","height","hemoglobin","rbc","protein","blood_pressure")
as select name,blood_group,concat(PERCENTAGE_OF_WEIGHT,'Kg') as WEIGHT,concat(PERCENTAGE_OF_height,'cm') AS HEIGHT,concat(PERCENTAGE_OF_hemoglobin,'%') AS HEMOGLOBIN
,concat(PERCENTAGE_OF_RBC,'%') AS RBC,concat(PERCENTAGE_OF_protein,'%') AS PROTEIN,BLOOD_PRESSURE
 from person join child using(person_id) join health_record using(person_id) join growth_rate using(health_record_id) where IMMUNOGLOBULIN='low' or PERCENTAGE_OF_WEIGHT>=40
WITH READ ONLY CONSTRAINT View1_Read_Only;


create or replace view child_death_view("name","DEATH_REG_NO","DATE_OF_DEATH","CAUSE_OF_DEATH","AGE")
as select name,DEATH_REG_NO,DATE_OF_DEATH,CAUSE_OF_DEATH,AGE
from person join child using(person_id) join child_accidents using(person_id) join unexpected_event using(case_id) join child_death_record using(case_id)
where person_id in(
select person_id
from person join child using(person_id) join child_worker using(person_id))
or person_id in(
select person_id
from person join child using(person_id) join disabled_child using(person_id));

create or replace view orphans_food_view("name","FATHERS CAUSE OF DEATH","MOTHERS CAUSE OF DEATH","FAMILIES LOOKING FOR ADOPTION","FOOD NAME","FOOD TYPE","TOTAL CALORIE","TOTAL COST","PROVIDER NAME","PROVIDER ADDRESS","PRESERVED AMOUNT") 
as select name,FATHERS_CAUSE_OF_DEATH,MOTHERS_CAUSE_OF_DEATH,FAMILIES_LOOKING_FOR_ADOPTION,FOOD_NAME,FOOD_TYPE,TOTAL_CALORIE,TOTAL_COST,PROVIDER_NAME,PROVIDER_ADDRESS,PRESERVED_AMOUNT	
 from person join child using(person_id) join orphan using(person_id) join supply_for_child using(person_id) join food using(supply_id)
WITH READ ONLY CONSTRAINT View2_Read_Only;


create or replace view medical_equipment_view("name","id","date_of_visit","disease_name","disease_type","cause","equipment_no","equipment_name","total_cost","delivary_date")
as select name,patient_id,date_of_visit,disease_name,disease_type,cause,equipment_no,
equipment_name,total_cost,delivary_date
from person join mothers_pregnancy_info using(person_id) join during_pregnancy_report using(person_id) join pregnancy_disease using(patient_id,date_of_visit)
join disease using (disease_id)join medical_support using(disease_id) join emergency_medical_support using(service_id) join 
emergency_medical_supply using (service_id) join medical_equipment using(supply_id)
WITH READ ONLY CONSTRAINT View3_Read_Only;

CREATE or REPLACE TRIGGER fund_Trigger

BEFORE UPDATE ON fund 

 
Declare 
amount int;

BEGIN    

select donated_amount into amount from fund; 

if (amount < 0)
then
RAISE_APPLICATION_ERROR (-20343, 'amount is negative'); 

else

update fund
	
set donated_amount =
	(select donated_amount from fund) + donated_amount;


end if;

 END;

create table Orphan_history
(
person_id      varchar2(35),

fathers_date_of_death   date,
mothers_date_of_death   date,

fathers_cause_of_death   varchar2(20),
mothers_cause_of_death   varchar2(20),
families_looking_for_adoption  int,
date_of_adoption               date,
date_of_entry                  date

);


CREATE or REPLACE TRIGGER orphan_Trigger 
after update ON orphan
for each row
when (new.date_of_adoption is not null)
begin
 dbms_output.put_line('orphan history updated');
 insert into Orphan_history values(:old.person_id,:old.fathers_date_of_death,:old.mothers_date_of_death,:old.fathers_cause_of_death,:old.mothers_cause_of_death,
:old.families_looking_for_adoption,:new.date_of_adoption,:old.date_of_entry);
end;


Create or replace Procedure mother_allinfo
(
person_id in varchar2,

name           in varchar2,
date_of_birth  in date,
email_address  in varchar2,
nationality    in varchar2,
blood_group   in varchar2,
religion       in varchar2,
gender        in varchar2,
city         in  varchar2,
Zip_code     in  varchar2,
street_name   in varchar2,
apartment_no  in varchar2,
gravidity      in int,
parity         in int,
LMP_date       in date,
previous_delivary_place  in varchar2
) 
as
Begin
  insert into person values(person_id,name,date_of_birth,email_address,nationality,blood_group,religion,gender,city,Zip_code,street_name,apartment_no);
  insert into mothers_pregnancy_info values(person_id,gravidity,parity,LMP_date,previous_delivary_place);
End

begin
mother_allinfo('P50016','Sanjida','11-01-2010','arnab@gmail.com','Banglaeshi','B+','Islam','Male','Dhaka','1400','Suvas-lane','14b','1','2','12-05-2013','Chadpur Medical');
end;

DECLARE  CURSOR Food_cursor
IS  SELECT name,Food_name FROM Food join supply_for_child using(supply_id) join child using(person_id) join person using(person_id) ;  
 
Food_val Food_cursor%ROWTYPE;
BEGIN 
 OPEN Food_cursor;  
LOOP
  FETCH Food_cursor INTO Food_val;  
EXIT WHEN Food_cursor%NOTFOUND;  
DBMS_OUTPUT.PUT_LINE(Food_val.Food_name||' is supplied to '||Food_val.name);   
END LOOP;  
CLOSE Food_cursor; 
 END; 




--------------------------------------------------   Rafi Ends -----------------------------------------------------------------



--------------------------------------------------   Tahsin Starts -------------------------------------------------------------

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


select name,homeland as "Homeland",camp_location "Present Camp" ,initcap(location) 
as "Shelter" from
person join uprooted_child using(person_id) join Shelter using(person_id)
where upper(refugee)='YES' and total_worker>2000;select homeland as "Homeland",camp_location "Camp" from
person join uprooted_child using(person_id)
where upper(refugee)='YES';


select victims_age as "Age of Marriage",partners_age as "Husband's age",h.cause as "Cause of Death" from 
unexpected_event join early_marriage_history
using(case_id) join child_abuse_history h using (case_id )
where lower(h.cause)='dowry'
and h.victims_report='death';


select name as "Mother's Name",date_of_visit as "Date Of Ultrasound Test",
date_of_visit+30*(possible_week_of_delivary-pregnancy_week) as 
"Possible Date of Delivary" ,child_date_of_birth as "Date of Birth",
floor((child_date_of_birth-date_of_visit)/30+pregnancy_week/4) as "Pregnancy Duration(Months)" from 
person join during_pregnancy_report using (person_id)
join ultra_sound_report u using(patient_id,date_of_visit)
join save_newborn using(person_id)
where floor((child_date_of_birth-date_of_visit)/30+pregnancy_week/4)<=9;

select name as "Name",monthly_expenses*12+yearly_saving as "Yearly Income",DONATED_AMOUNT as "Donation Received"
from person join socio_economic_history
using (person_id)
join insurance using (social_id) join financial_support using(social_id)
join fund using(record_no,transaction_id);

select city as "City",sum(monthly_expenses*12+yearly_saving) as "Total Yearly Income",
avg(total_working_hour) as "Average Working Hour", sum(yearly_saving) as "Total Yearly Saving"
from socio_economic_history join Person using(person_id )
group by(city);

select cause as "Cause of Addiction",count(person_id) as "No of victims" from person
join Addiction using(person_id) 
group by cause;


select cast(100*(select count(person_id) from Addiction where cause='Depression')/(select count(person_id)
from addiction)as decimal(4,2))as
"Drug Victims for Depression(%)" from person
join Addiction using(person_id)
group by cause having cause='Depression';
--finds the % of drug addicted which was casue by  Depression



select 100*((select count(case_id) from early_marriage_history where cause='financial')/(select count(case_id) from early_marriage_history ))as "Vicitm of Early Marriage"
from early_marriage_history group by cause having cause='financial'
--this query finds the % of early marriage due to a certain cause

create or replace view early_marriage_reason(Victim_Percentage) as
(select 100*((select count(case_id) from early_marriage_history where cause='poverty')/(select count(case_id) from early_marriage_history ))as "Vicitm of Early Marriage"
from early_marriage_history group by cause having cause='poverty')
--this query finds the % of early marriage due to a certain cause as view

select cast(100*((select count(person_id) from uprooted_child where initcap(homeland)='Myanmar')/(select count(person_id) from uprooted_child))
as decimal(4,2))||' %' as "Uprooted child from Myanmar"
from uprooted_child group by cause having cause='Racism'
--find the % of uprooted child came from Myanmar

select cast(100*((select count(case_id) from child_death_record where initcap(cause_of_death)='Pneumonia')/(select count(case_id) from child_death_record))
as decimal(4,2))||' % Children Died due to Pneumonia' as "Child Death Statistics"
from child_death_record group by cause_of_death having lower(cause_of_death)='pneumonia'
--find the % of child died due to pneumonia




--person table

CREATE SEQUENCE person_id_Seq
START WITH 6001
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;



--socio_economic_history
CREATE SEQUENCE social_id_Seq
START WITH 5
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


--disease
CREATE SEQUENCE disease_id_Seq
START WITH 7
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


--save_newborn
CREATE SEQUENCE birth_reg_no_Seq
START WITH 7
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


--emergency_medical_support
CREATE SEQUENCE service_id_Seq
START WITH 7
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


--emergency_medical_support
CREATE SEQUENCE health_worker_id_Seq
START WITH 8
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;

--Education
CREATE SEQUENCE education_id_Seq
START WITH 8
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;

--Fund
CREATE SEQUENCE record_no_Seq
START WITH 8
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;

--Fund
CREATE SEQUENCE transaction_id_Seq
START WITH 8
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;

--supply_and_logistics
CREATE SEQUENCE supply_id_Seq
START WITH 5
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;





CREATE OR REPLACE TRIGGER TriggerDisease
after insert
ON disease
FOR EACH ROW
BEGIN
insert into medicine(
	person_id,
	prescribed_medicine,
	illness_curing 
)
select         person_id,
	       treatment_taken,
	       disease_name
from disease join disease_history on disease.disease_id=disease_history.disease_id;
END;



create table person_backup
(
person_id      varchar2(35),

name           varchar2(35),
date_of_birth  date,
email_address  varchar2(35),
nationality    varchar2(20),
blood_group    varchar2(5),
religion       varchar2(10),
gender         varchar2(10),
city           varchar2(10),
Zip_code       varchar2(10),
street_name    varchar2(15),
apartment_no   varchar2(10)
);

create or replace trigger personbackup
before insert on person
for each row
begin
insert into person_backup values
(
:new.person_id ,    
:new.name ,          
:new.date_of_birth,
:new.email_address, 
:new.nationality  ,
:new.blood_group ,
:new.religion  ,     
:new.gender  ,      
:new.city  ,        
:new.Zip_code,       
:new.street_name  , 
:new.apartment_no  
);
end;
--trigger which creates a backup of Person table




create table adopted_child
(
person_id      varchar2(35),
date_of_adoption               date

)

create or replace trigger adoptedchild
before insert on Orphan
for each row
begin
insert into adopted_child values
(
:new.person_id ,    
:new.date_of_adoption 
);
end;
--trigger for adopted child


create table delivary
(
delivary_date               date,
hospital_clinic_name        varchar2(25),
mothers_weight              number(5,2),
babys_weight                number(5,2)
);

create or replace trigger babyDelivary
before insert on post_pregnancy_report
for each row
begin
insert into delivary values
(
:new.delivary_date,     
:new.hospital_clinic_name,
:new.mothers_weight,
:new.babys_weight 
);
end;
--trigger for a table which stores values of delivary date,and clinic/hospital name



create or replace view childview
as(
select name as "Child's Name",gender,city,families_looking_for_adoption
as "Families looking for adoption" ,c.cause as "Cause of Abuse"
from person join child using(person_id) join
child_worker using (person_id) join orphan using (person_id) join
child_accidents using(person_id) join unexpected_event using(case_id)
join child_abuse_history c using(case_id) join health_record using
(person_id) join growth_rate using(health_record_id)
where lower(blood_pressure)='high'
)


create or replace view childworker
as(
select name as "Child's Name",gender,city,addiction_name
as "Addiction Name",c.cause as "Cause of Addiction", 
working_area as "Works In"
from person join child using(person_id) join
child_worker using (person_id) join addicted_child using (person_id)
join addiction c using(person_id)
)

create or replace view motherfund
as(
select name as "Mother's Name",city ,disease_name
as "Disease Name",cause,disease_type as "Disease Type",
donated_amount "Donation Amount",donor_name as "Donor Name"
from person join mothers_pregnancy_info using(person_id)
join disease_history using(person_id)join disease using(disease_id)join
during_pregnancy_report using(person_id)join medical_support using
(disease_id) join emergency_medical_support using(service_id)
join fund_emergency_medical using(service_id) join fund using
(record_no,transaction_id) where lower(disease_type)='heart'
and donated_amount>70000 group by city
)

create or replace view childeducation
as(
select name as "Child's Name",gender,city,
yearly_educational_expenses as "Educational Expenses",
budget as "Total Budget",
from person join child using(person_id) join
education using(person_id)join supply_for_child
using (person_id)join supply_and_logistics using(supply_id)
join educational_support using(supply_id) where lower(supply_policy)
='Ensure Education' group by city order by budget;
)








--------------------------------------------------   Tahsin Ends ---------------------------------------------------------------


--------------------------------------------------  Tasfik Starts --------------------------------------------------------------


create or replace view login_as_mother
as
select * from person join mothers_pregnancy_info using(person_id)


insert into login_as_mother values(

'P50014',
'Tani Talha',
to_date('05/04/1990','dd/mm/yyyy'),
'tani@gmail.com',
'Bangladeshi',
'A-',
'Islam',
'FeMale',
'Dinajpur',
'1400',
'Munshipara',
'15D',
2,
2,
to_date('07/08/2010','dd/mm/yyyy'),
'Dinajpur Medical'

)

create or replace view person_info_view
(
	"PERSON_ID",
	"NAME",
	"DATE_OF_BIRTH",
	"NATIONALITY",
	"BLOOD_GROUP",
	"RELIGION",
	"GENDER"
) as
select PERSON_ID,NAME,
	   DATE_OF_BIRTH,NATIONALITY,
	   BLOOD_GROUP,RELIGION,GENDER
from person

create or replace view person_contacts_view
(
	"PERSON_ID",
	"NAME",
	"EMAIL_ADDRESS",
	"NATIONALITY",
	"CITY",
	"ZIP_CODE",
	"STREET_NAME",
	"APARTMENT_NO"
) as
select PERSON_ID,NAME,
	   EMAIL_ADDRESS,NATIONALITY,
	   CITY,ZIP_CODE,STREET_NAME,
	   APARTMENT_NO
from person

create or replace view person_after_1990_view
(
	"PERSON_ID",
	"NAME",
	"DATE_OF_BIRTH",
	"EMAIL_ADDRESS",
	"NATIONALITY",
	"BLOOD_GROUP",
	"RELIGION",
	"GENDER",
	"CITY",
	"ZIP_CODE",
	"STREET_NAME",
	"APARTMENT_NO"
) as
select PERSON_ID,NAME,
	   DATE_OF_BIRTH,EMAIL_ADDRESS,
	   NATIONALITY,BLOOD_GROUP,RELIGION,
	   GENDER,CITY,ZIP_CODE,STREET_NAME,
	   APARTMENT_NO
from person
where DATE_OF_BIRTH > to_date('01/01/1990','dd/mm/yyyy')
with check option constraint birthdate_before_1990;

--------------------------------------------------   Tasfik Ends ---------------------------------------------------------------
