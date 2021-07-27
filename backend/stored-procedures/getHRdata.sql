/*
    VERSION - 1,02
*/

CREATE DEFINER=`root`@`localhost` PROCEDURE `getHRData`(
	IN district_list varchar(200),
    IN taluka_list varchar(200),
    IN start_date date,
    IN end_date date)
BEGIN
	/*
        
		DistrictId
        TalukaId
        
        Contract From
        Contract To
        
        Group by: Designation ID, month
    */
    
	DECLARE district_id_string varchar(300);
    DECLARE taluka_id_string varchar(300);
	DECLARE date_filter_string varchar(300);
    DECLARE group_by_string  varchar(500);
    
    SET @display_string="DesignationID,COUNT(HRDataId) as TotalActivePeople";
	SET @taluka_id_string = NULL;
    SET @date_filter_string = NULL;
    SET @group_by_string = "DesignationID";
    
	
	SELECT MIN(ContarctPeriodfrom) INTO @MinContractPeriod FROM DMHPv1.tbl_hrdatainfo;
    SELECT MAX(ContarctPeriodTo) INTO @MaxContractPeriod FROM DMHPv1.tbl_hrdatainfo;
    
    
	/* Create a district id filter statement string */
    if(district_list = '') then
		set @district_id_string = CONCAT("DistrictId IN (select distinct DistrictId from DMHPv1.tbl_hrdatainfo)");
	else
		set @district_id_string = CONCAT("DistrictId IN (",district_list,")");
	end if;
    
    /*Create a taluka id filter string */
     if(taluka_list = '') then
		set @taluka_id_string = CONCAT("(TalukaId IN (select distinct TalukaId from DMHPv1.tbl_hrdatainfo) OR TalukaId IS NULL)");
	else
		set @taluka_id_string = CONCAT("TalukaId IN (",taluka_list,")");
	end if;
    
    
     /* Filter by Start date and End Date */
    if(start_date IS NULL and end_date IS NULL) then 
		set @date_filter_string = CONCAT("DATE(ContarctPeriodfrom) Between '", @MinContractPeriod , "' AND '", @MaxContractPeriod, "'");
	elseif(start_date IS NULL) then
		set @date_filter_string = CONCAT("DATE(ContarctPeriodTo) >= '", end_date, "'");
	elseif(end_date IS NULL) then
		set @date_filter_string = CONCAT("DATE(ContarctPeriodfrom) <= '", start_date, "' and DATE(ContarctPeriodTo) >= '", start_date, "'");
	else 
		set @date_filter_string = CONCAT("DATE(ContarctPeriodfrom) <= '", start_date, "' and DATE(ContarctPeriodTo) >= '", end_date, "'");
	end if;
    
    
    set @statement = CONCAT("select ", @display_string ," from DMHPv1.tbl_hrdatainfo where StateId = 17  and ", @district_id_string, 
    " and ", @taluka_id_string, " and ",
    @date_filter_string, " GROUP BY ", @group_by_string);
    
    -- select concat(@statement);
    prepare stmt from @statement;
    execute stmt;
    deallocate prepare stmt;
END
