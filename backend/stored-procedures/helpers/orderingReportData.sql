CREATE table DMHPv1.ReportData as
	SELECT * FROM DMHPv1.Reportdata_restructured order by ReportId asc,
    StateId asc,DistrictId asc,VisitType asc,Gender asc;



SET SQL_SAFE_UPDATES=0;
-- update DMHP.ReportData SET FacilityType=2 where MncHospitalId is not NULL;
update DMHPv1.ReportData SET TalukaId=MncHospitalId where TalukaId=0;
-- update DMHP.ReportData SET FacilityType=3 where PhcId !=0;
-- update DMHP.ReportData SET FacilityType=4 where ChcId !=0;
SET SQL_SAFE_UPDATES=1;

Alter Table DMHPv1.ReportData DROP column MncHospitalId;
-- Alter Table DMHP.ReportData DROP column PhcId;
-- Alter Table DMHP.ReportData DROP column ChcId;


SET SQL_SAFE_UPDATES=0;
update DMHPv1.ReportData SET TalukaId=274 where ReportId=80682 and TalukaId=0;
update DMHPv1.ReportData SET TalukaId=180 where ReportId=80882 and TalukaId=0;
update DMHPv1.ReportData SET FacilityType=1 where TalukaId=274 or TalukaId=180;
SET SQL_SAFE_UPDATES=1;

DROP TABLE DMHPv1.Reportdata_restructured;



SET SQL_SAFE_UPDATES=0;
update DMHPv1.ReportData SET FacilityTypeId=1,FacilityType='PHC' where FacilityId in (select distinct FacilityId from DMHPv1.tbl_facility where FacilityTypeId=1);
update DMHPv1.ReportData SET FacilityTypeId=2,FacilityType='CHC' where FacilityId in (select distinct FacilityId from DMHPv1.tbl_facility where FacilityTypeId=2);
update DMHPv1.ReportData SET FacilityTypeId=3,FacilityType='Taluka Hospital' where FacilityId in (select distinct FacilityId from DMHPv1.tbl_facility where FacilityTypeId=3);
update DMHPv1.ReportData SET FacilityTypeId=4,FacilityType='District Hospital' where FacilityId in (select distinct FacilityId from DMHPv1.tbl_facility where FacilityTypeId=4);
update DMHPv1.ReportData SET FacilityTypeId=5,FacilityType='Medical college' where FacilityId in (select distinct FacilityId from DMHPv1.tbl_facility where FacilityTypeId=5);
update DMHPv1.ReportData SET FacilityTypeId=6,FacilityType='Medical Institute' where FacilityId in (select distinct FacilityId from DMHPv1.tbl_facility where FacilityTypeId=6);
update DMHPv1.ReportData SET FacilityTypeId=7,FacilityType='Others' where FacilityId in (select distinct FacilityId from DMHPv1.tbl_facility where FacilityTypeId=7);
update DMHPv1.ReportData SET FacilityTypeId=8,FacilityType='MnC' where FacilityId is NULL;
update DMHPv1.ReportData SET FacilityTypeId=8,FacilityType='MnC' where FacilityId = 0;
SET SQL_SAFE_UPDATES=1;
