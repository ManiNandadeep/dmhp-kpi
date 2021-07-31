/*
	VERSION : 1,01
*/
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `timeperiodtype`(
		IN display varchar(250),IN disease varchar(500),
		IN start_date date,IN end_date date,IN visit_type varchar(50),IN gender_string varchar(50),
        IN facilitytype_list varchar(200),IN district_list varchar(200), IN taluka_list varchar(200),
        IN group_by varchar(250),IN timeperiod_type VARCHAR(200) ,IN year_type varchar(100))
BEGIN

	DECLARE display_string VARCHAR(250);
    DECLARE agg VARCHAR(500);
    DECLARE group_by_string VARCHAR(500);
    DECLARE financial VARCHAR(600);
    DECLARE district_id_string VARCHAR(250);
    DECLARE taluka_id_string VARCHAR(250);
    DECLARE facilitytype_id_string VARCHAR(250);
    
    SET @display_string=NULL;
    SET @group_by_string=NULL;
    SET @agg=NULL;
    
    SET @financial:=CONCAT("CASE WHEN MONTH(ReportingMonthyear) BETWEEN 4 AND 12 THEN
	 concat(YEAR(ReportingMonthyear), '-',YEAR(ReportingMonthyear)+1)
	 WHEN MONTH(ReportingMonthyear) BETWEEN 1 AND 3 THEN
	 concat(YEAR(ReportingMonthyear)-1,'-', YEAR(ReportingMonthyear)) 
	 END ");
	 
	 SET @fquarter:=CONCAT("CASE 
	 WHEN QUARTER(ReportingMonthyear) = 1 THEN 4
	 WHEN QUARTER(ReportingMonthyear) = 2 THEN 1
	 WHEN QUARTER(ReportingMonthyear) = 3 THEN 2
	 WHEN QUARTER(ReportingMonthyear) = 4 THEN 3
	 END ");
   
    
    
    
    
	IF(gender_string='') THEN
		SET @gender_string_filter=CONCAT("Gender LIKE '%'");
	ELSE
		SET @gender_string_filter=CONCAT("Gender in (",gender_string,")");
	END IF; 
    
	IF(visit_type='')THEN
		SET @visit_type_filter=CONCAT("VisitType LIKE '%'");
	ELSE 
		SET @visit_type_filter=CONCAT("VisitType in (",visit_type,")");
	END IF;
    
    
    	IF(facilitytype_list='')THEN
		SET @facilitytype_id_string=CONCAT("FacilityTypeId IN (select distinct FacilityTypeId from DMHPv1.ReportData)");
	ELSE
		SET @facilitytype_id_string=CONCAT("FacilityTypeId IN (",facilitytype_list,")");
    	END IF;
    
	IF(district_list='')THEN
		SET @district_id_string=CONCAT("DistrictId IN (select distinct DistrictId from DMHPv1.ReportData)");
    	ELSE
		SET @district_id_string:= CONCAT("DistrictId IN (",district_list,")");
    	END IF;
    
	IF(taluka_list='')THEN
		SET @taluka_id_string=CONCAT("(TalukaId IN (select distinct TalukaId from DMHPv1.ReportData) OR TalukaId is NULL)");
    	ELSE
		SET @taluka_id_string:= CONCAT("TalukaId IN (",taluka_list,")");
    	END IF;
    
    
    
    
    
    
-- This particular if-else set will tell what to display at output of mysql..    
       
	    IF(FIND_IN_SET('ReportId',display))THEN
			SET @display_string=CONCAT("ReportId");
		END IF;
        
    IF(FIND_IN_SET('DistrictId',display))THEN
		IF(@display_string is NULL)THEN
			SET @display_string=CONCAT("DistrictId");
		ELSE
			SET @display_string=CONCAT(@display_string,",DistrictId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('TalukaId',display))THEN
		IF(@display_string is NULL)THEN
			SET @display_string=CONCAT("TalukaId");
		ELSE
			SET @display_string=CONCAT(@display_string,",TalukaId");
		END IF;
	END IF;
   
   
   
   IF(FIND_IN_SET('ReportingMonthyear',display))THEN
		IF(timeperiod_type='annually')THEN
			IF (year_type='c') THEN
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT("YEAR(ReportingMonthyear)");
				ELSE
					SET @display_string=CONCAT(@display_string,",YEAR(ReportingMonthyear)");
				END IF;
			ELSE
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT(@financial," as financial_year");
				ELSE
					SET @display_string=CONCAT(@display_string,",",@financial," as financial_year");
				END IF;
			END IF;
		END IF;
	END IF;
    
    
     IF(FIND_IN_SET('ReportingMonthyear',display))THEN
		IF(timeperiod_type='quaterlly')THEN
			IF (year_type='c') THEN
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT("YEAR(ReportingMonthyear),QUARTER(ReportingMonthyear)as Quarter");
				ELSE
					SET @display_string=CONCAT(@display_string,",YEAR(ReportingMonthyear), QUARTER(ReportingMonthyear) as Quarter");
				END IF;
			ELSE
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT(@financial," as financial_year,",@fquarter," as Quarter");
				ELSE
					SET @display_string=CONCAT(@display_string,",",@financial," as financial_year,",@fquarter," as Quarter");
				END IF;
			END IF;
        END IF;
     END IF;
     
	IF(FIND_IN_SET('ReportingMonthyear',display))THEN
		IF(timeperiod_type='monthly')THEN
			IF(@display_string is NULL)THEN
				SET @display_string=CONCAT("ReportingMonthyear");
			ELSE
				SET @display_string=CONCAT(@display_string,",ReportingMonthyear");
			END IF;
        END IF;
	END IF;
    
    
    

    
    

-- This particular if-else set will find on what column group by need to be performed 


    IF(FIND_IN_SET('ReportId',group_by))THEN
		SET @group_by_string=CONCAT("ReportId");
	END IF;
    
    IF(FIND_IN_SET('DistrictId',group_by))THEN
		IF(@group_by_string is NULL)THEN
			SET @group_by_string=CONCAT("DistrictId");
		ELSE
			SET @group_by_string=CONCAT(@group_by_string,",DistrictId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('TalukaId',group_by))THEN
		IF(@group_by_string is NULL)THEN
			SET @group_by_string=CONCAT("TalukaId");
		ELSE
			SET @group_by_string=CONCAT(@group_by_string,",TalukaId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('ReportingMonthyear',group_by))THEN
		IF(timeperiod_type='annually')THEN
			IF (year_type='c') THEN
				IF(@group_by_string is NULL)THEN
					SET @group_by_string=CONCAT("YEAR(ReportingMonthyear)");
				ELSE
					SET @group_by_string=CONCAT(@group_by_string,",YEAR(ReportingMonthyear)");
				END IF;
			ELSE
				IF(@group_by_string is NULL)THEN
					SET @group_by_string=CONCAT("financial_year");
				ELSE
					SET @group_by_string=CONCAT(@group_by_string,",financial_year");
				END IF;
			END IF;
		END IF;
	END IF;
    
	IF(FIND_IN_SET('ReportingMonthyear',group_by))THEN
		IF(timeperiod_type='quaterlly')THEN
			IF (year_type='c') THEN
				IF(@group_by_string is NULL)THEN
					SET @group_by_string=CONCAT("YEAR(ReportingMonthyear),Quarter");
				ELSE
					SET @group_by_string=CONCAT(@group_by_string,",YEAR(ReportingMonthyear),Quarter");
				END IF;
			ELSE
				IF(@group_by_string is NULL)THEN
					SET @group_by_string=CONCAT("financial_year,Quarter");
				ELSE
					SET @group_by_string=CONCAT(@group_by_string,",financial_year,Quarter");
				END IF;
			END IF;
		END IF;
	END IF;
    
    
	IF(FIND_IN_SET('ReportingMonthyear',group_by))THEN
		IF(timeperiod_type='monthly')THEN
			IF(@group_by_string is NULL)THEN
				SET @group_by_string=CONCAT("ReportingMonthyear");
			ELSE
				SET @group_by_string=CONCAT(@group_by_string,",ReportingMonthyear");
			END IF;	
		END IF;
	END IF;
    
    
-- Disease that need to be displayed     
    
	If(FIND_IN_SET('SMD',disease))THEN
		SET @agg:=CONCAT("SUM(SMD)");
	END IF;
    
    IF(FIND_IN_SET('CMD',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(CMD)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(CMD)");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('SuicideAttempts',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(SuicideAttempts)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(SuicideAttempts)");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Epilepsy',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(Epilepsy)");
		ELSE
		SET @agg:=CONCAT(@agg,",SUM(Epilepsy)");
        END IF;
	END IF;    
    
    IF(FIND_IN_SET('AlcoholSubstanceAbuse',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(AlcoholSubstanceAbuse)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(AlcoholSubstanceAbuse)");
        END IF;
	END IF;    
        
    IF(FIND_IN_SET('Dementia',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(Dementia)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(Dementia)");
		END IF;
	END IF;    
    
	IF(FIND_IN_SET('DevelopmentalDisorders',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(DevelopmentalDisorders)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(DevelopmentalDisorders)");
		END IF;
	END IF;    
       
	IF(FIND_IN_SET('BehaviouralDisorders',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(BehaviouralDisorders)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(BehaviouralDisorders)");
		END IF;
	END IF;    
       
	IF(FIND_IN_SET('EmotionalDisorders',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(EmotionalDisorders)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(EmotionalDisorders)");
		END IF;
	END IF;    
       
    IF(FIND_IN_SET('PsychiatricDisorders',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(PsychiatricDisorders)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(PsychiatricDisorders)");
		END IF;
	END IF;    
    
	IF(FIND_IN_SET('Others',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(Others)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(Others)");
		END IF;
	END IF;    
       
	IF(FIND_IN_SET('Referred',disease))THEN
		IF(@agg is NULL) THEN
			SET @agg:=CONCAT("SUM(Referred)");
		ELSE
			SET @agg:=CONCAT(@agg,",SUM(Referred)");
		END IF;
	END IF;    
       
       
	SET @disease_filter := CONCAT(replace(disease,",","+"));   
       

	IF(FIND_IN_SET('DistrictId',display))THEN
		IF(@display_string is NULL)THEN
			SET @display_string=CONCAT("DistrictId");
		ELSE
			SET @display_string=CONCAT(@display_string,",DistrictId");
		END IF;
	END IF;
	
	SET @s=CONCAT("select ",@display_string,",",@agg,",sum(",@disease_filter,") as TotalCases 
			from ReportData where ",@gender_string_filter," and ",@visit_type_filter," and ",@facilitytype_id_string," and ",
            @district_id_string," and ",@taluka_id_string," and ReportingMonthyear BETWEEN '",start_date,"' and '",end_date,"' group by ",
            @group_by_string);
	
	 

    
    
	PREPARE stmt FROM @s;
    EXECUTE stmt ;
    DEALLOCATE PREPARE stmt;


END $$