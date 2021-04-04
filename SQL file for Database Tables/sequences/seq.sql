------------------------------------------------ Tahsin starts -------------------------------------------------------------------



--person table

CREATE SEQUENCE person_id_Seq
START WITH 6001
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


---during_pregnancy_report
CREATE SEQUENCE patient_id_Seq
START WITH 30
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


--socio_economic_history
CREATE SEQUENCE social_id_Seq
START WITH 52
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


--disease
CREATE SEQUENCE disease_id_Seq
START WITH 77
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


--save_newborn
CREATE SEQUENCE birth_reg_no_Seq
START WITH 77
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


--emergency_medical_support
CREATE SEQUENCE service_id_Seq
START WITH 77
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;


--emergency_medical_support
CREATE SEQUENCE health_worker_id_Seq
START WITH 88
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
START WITH 88
INCREMENT BY 1
MAXVALUE 99999
CACHE 20
NOCYCLE;

--Fund
CREATE SEQUENCE transaction_id_Seq
START WITH 100
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


------------------------------------------------ Tahsin ends  -------------------------------------------------------------------
