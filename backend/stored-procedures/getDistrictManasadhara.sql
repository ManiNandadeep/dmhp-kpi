CREATE DEFINER=`root`@`localhost` PROCEDURE `getDistrictManasadhara`(
	IN display varchar(200),
	IN group_by varchar(200),
    IN agg varchar(200),
	IN district_list varchar(200),
    IN status_list varchar(200),
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
        status_list
		
        start_date
		end_date
        timeperiod_type
		year_type 
    */
    
	DECLARE district_id_string varchar(300);
    DECLARE status_id_string varchar(300);
    DECLARE agg_string varchar(500);
	DECLARE date_filter_string varchar(300);
    DECLARE display_string varchar(500);
    DECLARE group_by_string  varchar(500);
    
    SET @display_string=NULL;
    SET @group_by_string = NULL;
	SET @agg_string = NULL;
    
    
    SET @total_expense_string = "(SUM(Head_15) + SUM(Head_59) + 
		SUM(Head_71) + SUM(Head_195) + SUM(Head_195) + SUM(Head_200) +
        SUM(Head_235) + SUM(Head_222)) as TotalExpense";

	
	SELECT MIN(ReportingMonthYear) INTO @MinReportingMonthYear FROM DMHPv1.tbl_districtmanasadhara;
    SELECT MAX(ReportingMonthYear) INTO @MaxReportingMonthYear FROM DMHPv1.tbl_districtmanasadhara;
    
    
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
    
    if(status_list = '') then
		set @status_id_string = CONCAT("StatusId IN (select distinct StatusId from DMHPv1.tbl_districtmanasadhara)");
	else
		set @status_id_string = CONCAT("StatusId IN (",status_list,")");
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
    IF(FIND_IN_SET('MNSId',display))THEN
			SET @display_string=CONCAT("MNSId");
		END IF;
        
    IF(FIND_IN_SET('DistrictId',display))THEN
		IF(@display_string is NULL)THEN
			SET @display_string=CONCAT("DistrictId");
		ELSE
			SET @display_string=CONCAT(@display_string,",DistrictId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('StatusId',display))THEN
		IF(@display_string is NULL)THEN
			SET @display_string=CONCAT("StatusId");
		ELSE
			SET @display_string=CONCAT(@display_string,",StatusId");
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
    If(FIND_IN_SET('Head_15',agg))THEN
		SET @agg_string = CONCAT("SUM(Head_15) as Head_15");
	END IF;
    
    
     IF(FIND_IN_SET('Head_59',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string = CONCAT("SUM(Head_59) as Head_59");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Head_59) as Head_59");
		END IF;
	END IF;
    
    
    IF(FIND_IN_SET('Head_71',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Head_71) as Head_71");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Head_71) as Head_71");
		END IF;
	END IF;
	
    
    IF(FIND_IN_SET('Head_195',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Head_195) as Head_195");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Head_195) as Head_195");
		END IF;
	END IF;
    
    
    IF(FIND_IN_SET('Head_200',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Head_200) as Head_200");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Head_200) as Head_200");
		END IF;
	END IF;
    
    
    IF(FIND_IN_SET('Head_235',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Head_235) as Head_235");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Head_235) as Head_235");
		END IF;
	END IF;
    
	
    IF(FIND_IN_SET('Head_222',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(Head_222) as Head_222");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(Head_222) as Head_222");
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
    IF(FIND_IN_SET('MNSId',group_by)) THEN
		set @group_by_string = CONCAT("MNSId");
	END IF;
    
    
    IF(FIND_IN_SET('DistrictId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("DistrictId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",DistrictId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('StatusId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("StatusId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",StatusId");
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
    
    
    
    set @statement = CONCAT("select ", @display_string ,",", @agg_string ," from DMHPv1.tbl_districtmanasadhara where StateId = 17 and ", @district_id_string, " and ", @status_id_string, " and ", @date_filter_string, "GROUP BY ", @group_by_string);
    
    # select concat(@statement);
    prepare stmt from @statement;
    execute stmt;
    deallocate prepare stmt;
END
