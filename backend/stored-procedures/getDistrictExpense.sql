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
	DECLARE date_filter_string varchar(300);

	
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
    
    set @statement = CONCAT("select * from DMHPv1.tbl_districtexpense where StateId = 17 and ", @district_id_string, " and ", @date_filter_string);
    
    # select concat(@statement);
    prepare stmt from @statement;
    execute stmt;
    deallocate prepare stmt;
END
