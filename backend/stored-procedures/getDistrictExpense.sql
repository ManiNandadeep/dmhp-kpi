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
    DECLARE display_string varchar(500);
    DECLARE group_by_string  varchar(500);
    
    SET @display_string=NULL;
    SET @group_by_string = NULL;
	SET @agg_string = NULL;
    
    
    SET @total_expense_string = "(SUM(B3032_Psychiatrists) + SUM(B30112_Psyst_Counsellor) + 
		SUM(B30114_SocialWorker) + SUM(B3012_StaffNurse) + SUM(B3012_PsyNurse) + SUM(B30137_MedialRedAsst) +
        SUM(B30137_WardAsst) + SUM(Infrastucture) + SUM(Training) + SUM(IEC) + SUM(TargetIntervention) + SUM(Drugs) +
        SUM(Equipments) + SUM(OperationExpense) + SUM(AmbulatoryService) + SUM(Miscellanious) + SUM(StateStaff1) +
        SUM(StateStaff2) + SUM(B3032_PsychiatristsTA) + SUM(B30114_SocialWorkerTA) + SUM(B10162_Awarness) + 
        SUM(J17_Contingency) + SUM(J18_InnovationMH) + SUM(B2030_AnnualIncrement)) as TotalExpense";

	
	SELECT MIN(ReportingMonthYear) INTO @MinReportingMonthYear FROM DMHPv1.tbl_districtexpense;
    SELECT MAX(ReportingMonthYear) INTO @MaxReportingMonthYear FROM DMHPv1.tbl_districtexpense;
    
    
    SET @financial:=CONCAT("CASE WHEN MONTH(ReportingMonthYear) BETWEEN 4 AND 12 THEN
	 concat(YEAR(ReportingMonthYear), '-',YEAR(ReportingMonthYear)+1)
	 WHEN MONTH(ReportingMonthYear) BETWEEN 1 AND 3 THEN
	 concat(YEAR(ReportingMonthYear)-1,'-', YEAR(ReportingMonthYear)) 
	 END ");
   
    SET @fquarter:=CONCAT("CASE 
	 WHEN QUARTER(ReportingMonthYear) = 1 THEN 4
	 WHEN QUARTER(ReportingMonthYear) = 2 THEN 1
	 WHEN QUARTER(ReportingMonthYear) = 3 THEN 2
	 WHEN QUARTER(ReportingMonthYear) = 4 THEN 3
	 END ");

    
    
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
    
    
    
    /* Display statements */
    IF(FIND_IN_SET('BudgetExpenseId',display))THEN
			SET @display_string=CONCAT("BudgetExpenseId");
		END IF;
        
    IF(FIND_IN_SET('DistrictId',display))THEN
		IF(@display_string is NULL)THEN
			SET @display_string=CONCAT("DistrictId");
		ELSE
			SET @display_string=CONCAT(@display_string,",DistrictId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('ReportingMonthYear',display))THEN
		IF(timeperiod_type='annually')THEN
			IF (year_type='c') THEN
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT("YEAR(ReportingMonthYear)");
				ELSE
					SET @display_string=CONCAT(@display_string,",YEAR(ReportingMonthYear)");
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
    
    
     IF(FIND_IN_SET('ReportingMonthYear',display))THEN
		IF(timeperiod_type='quarterly')THEN
			IF (year_type='c') THEN
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT("YEAR(ReportingMonthYear),QUARTER(ReportingMonthYear)as Quarter");
				ELSE
					SET @display_string=CONCAT(@display_string,",YEAR(ReportingMonthYear), QUARTER(ReportingMonthYear) as Quarter");
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
     
	IF(FIND_IN_SET('ReportingMonthYear',display))THEN
		IF(timeperiod_type='monthly')THEN
			IF(@display_string is NULL)THEN
				SET @display_string=CONCAT("ReportingMonthYear");
			ELSE
				SET @display_string=CONCAT(@display_string,",ReportingMonthYear");
			END IF;
        END IF;
	END IF;


    
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
    
    IF(FIND_IN_SET('TotalExpense',agg)) THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string = CONCAT(@total_expense_string);
		ELSE 
			SET @agg_string = CONCAT(@agg_string,",",@total_expense_string);
		END IF;
	END IF;
    
    
    /* GROUP BY filtration */
    IF(FIND_IN_SET('BudgetExpenseId',group_by)) THEN
		set @group_by_string = CONCAT("BudgetExpenseId");
	END IF;
    
    
    IF(FIND_IN_SET('DistrictId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("DistrictId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",DistrictId");
		END IF;
	END IF;
    
    
    IF(FIND_IN_SET('Year',group_by)) THEN
		IF(year_type='c') THEN
			IF(@group_by_string is NULL) THEN
				set @group_by_string = CONCAT("Year");
			ELSE
				set @group_by_string = CONCAT(@group_by_string,",Year");
			END IF;
		ELSE
			IF(@group_by_string is NULL) THEN
				set @group_by_string = CONCAT("financial_year");
			ELSE
				set @group_by_string = CONCAT(@group_by_string,",financial_year");
			END IF;
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Quarter',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("Quarter");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",Quarter");
		END IF;
	END IF;
    
    
    
    set @statement = CONCAT("select ", @display_string ,",", @agg_string ," from DMHPv1.tbl_districtexpense where StateId = 17 and ", @district_id_string, " and ", @date_filter_string, "GROUP BY ", @group_by_string, " ORDER BY DistrictID");
    
    # select concat(@statement);
    prepare stmt from @statement;
    execute stmt;
    deallocate prepare stmt;
END