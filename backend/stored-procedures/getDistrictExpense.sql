CREATE DEFINER=`root`@`localhost` PROCEDURE `getDistrictExpense`(
	IN display varchar(200),
	IN group_by varchar(200),
    IN agg varchar(200),
	IN district_list varchar(200),
    IN start_date date,
    IN end_date date,
    IN timeperiod_type varchar(200),
    IN year_type varchar(200))
BEGIN
	/*
		display
		group_by
		agg
		
        district_list
		
        start_date
		end_date
        timeperiod_type
		year_type 
    */
    
	DECLARE district_id_string varchar(300);
    DECLARE agg_string varchar(500);
	DECLARE date_filter_string varchar(300);
    
     SET @agg_string = NULL;

	
	SELECT MIN(ReportingMonthYear) INTO @MinReportingMonthYear FROM DMHPv1.tbl_districtexpense;
    SELECT MAX(ReportingMonthYear) INTO @MaxReportingMonthYear FROM DMHPv1.tbl_districtexpense;
    
	/* Create a district id filter statement string */
    if(district_list = '') then
		set @district_id_string = CONCAT("DistrictId IN (select distinct DistrictId from DMHPv1.Districts)");
	else
		set @district_id_string = CONCAT("DistrictId IN (",district_list,")");
	end if;
    
    
     /* Filter by Start date and End Date */
    if(start_date IS NULL and end_date IS NULL) then 
		set @date_filter_string = CONCAT("ReportingMonthYear BETWEEN '", @MinReportingMonthYear , "' and '", @MaxReportingMonthYear, "'");
	elseif(start_date IS NULL) then
		set @date_filter_string = CONCAT("ReportingMonthYear <= '", end_date, "'");
	elseif(end_date IS NULL) then
		set @date_filter_string = CONCAT("ReportingMonthYear >= '", start_date, "'");
	else 
		set @date_filter_string = CONCAT("ReportingMonthYear BETWEEN '", start_date, "' and '", end_date , "'");
	end if;
    
    
    
    
    /* Aggregation statements */
    If(FIND_IN_SET('Psychiatrists',agg))THEN
		SET @agg_string = CONCAT("SUM(B3032_Psychiatrists) as Psychiatrists");
	END IF;
    
    
     IF(FIND_IN_SET('Psyst_Counsellor',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string = CONCAT("SUM(B30112_Psyst_Counsellor) as Psyst_Counsellor");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B30112_Psyst_Counsellor) as Psyst_Counsellor");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('SocialWorker',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(B30114_SocialWorker) as SocialWorker");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B30114_SocialWorker) as SocialWorker");
		END IF;
	END IF;
	
     IF(FIND_IN_SET('StaffNurse',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(B3012_StaffNurse) as StaffNurse");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B3012_StaffNurse) as StaffNurse");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('PsyNurse',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(B3012_PsyNurse) as PsyNurse");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B3012_PsyNurse) as PsyNurse");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('MedialRedAsst',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(B30137_MedialRedAsst) as MedialRedAsst");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B30137_MedialRedAsst) as MedialRedAsst");
		END IF;
	END IF;
    
	IF(FIND_IN_SET('WardAsst',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(B30137_WardAsst) as WardAsst");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B30137_WardAsst) as WardAsst");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Infrastucture',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Infrastucture) as Infrastucture");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Infrastucture) as Infrastucture");
		END IF;
	END IF;
    
	IF(FIND_IN_SET('Training',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Training) as Training");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Training) as Training");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('IEC',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(IEC) as IEC");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(IEC) as IEC");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('TargetIntervention',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(TargetIntervention) as TargetIntervention");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(TargetIntervention) as TargetIntervention");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Drugs',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Drugs) as Drugs");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Drugs) as Drugs");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Equipments',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Equipments) as Equipments");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Equipments) as Equipments");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('OperationExpense',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(OperationExpense) as OperationExpense");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(OperationExpense) as OperationExpense");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('AmbulatoryService',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(AmbulatoryService) as AmbulatoryService");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(AmbulatoryService) as AmbulatoryService");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Miscellanious',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Miscellanious) as Miscellanious");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Miscellanious) as Miscellanious");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('StateStaff1',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(StateStaff1) as StateStaff1");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(StateStaff1) as StateStaff1");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('StateStaff2',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(StateStaff2) as StateStaff2");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(StateStaff2) as StateStaff2");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('PsychiatristsTA',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(B3032_PsychiatristsTA) as PsychiatristsTA");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B3032_PsychiatristsTA) as PsychiatristsTA");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('SocialWorkerTA',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(B30114_SocialWorkerTA) as SocialWorkerTA");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B30114_SocialWorkerTA) as SocialWorkerTA");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Awarness',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(B10162_Awarness) as Awarness");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B10162_Awarness) as Awarness");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Contingency',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(J17_Contingency) as Contingency");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(J17_Contingency) as Contingency");
		END IF;
	END IF;
 
	IF(FIND_IN_SET('InnovationMH',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(J18_InnovationMH) as InnovationMH");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(J18_InnovationMH) as InnovationMH");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('AnnualIncrement',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(B2030_AnnualIncrement) as AnnualIncrement");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(B2030_AnnualIncrement) as AnnualIncrement");
		END IF;
	END IF;
    
    set @statement = CONCAT("select BudgetExpenseId,DistrictId,ReportingMonthYear,", @agg_string ," from DMHPv1.tbl_districtexpense where StateId = 17 and ", @district_id_string, " and ", @date_filter_string, "GROUP BY BudgetExpenseId");
    
    
    # select concat(@statement);
    prepare stmt from @statement;
    execute stmt;
    deallocate prepare stmt;
END
