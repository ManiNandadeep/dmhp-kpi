CREATE DEFINER=`root`@`localhost` PROCEDURE `getTraining`(
	IN district_list varchar(200), 
    IN event_list varchar(200), 
    IN target_group_list varchar(200),
    IN resource_list varchar(200),
    IN start_date date,
    IN end_date date)
BEGIN
	
    /*
		StateId
		DistrictId
        EventId
        TargetGrpId
        ResourceId
        
        EventFrom
        EventTo
        
        FacilityTypeId ?
        SensitizationId ?
        
        CalenderType -> c/f
        TimePeriod -> a/m/q
    */

	/* Declaring session variables*/
	DECLARE district_id_string varchar(300);
    DECLARE event_id_string varchar(300);
	DECLARE target_group_id_string varchar(300);
    DECLARE resource_id_string varchar(300);
    DECLARE date_filter_string varchar(300);
    DECLARE MaxEventFrom date;
    DECLARE MinEventFrom date;
    
    SELECT MIN(EventFrom) INTO @MinEventFrom FROM DMHPv1.tbl_training;
    SELECT MAX(EventFrom) INTO @MaxEventFrom FROM DMHPv1.tbl_training;
        
    /* Create a district id filter statement string */
    if(district_list = '') then
		set @district_id_string = CONCAT("DistrictId IN (select distinct DistrictId from DMHPv1.districts)");
	else
		set @district_id_string = CONCAT("DistrictId IN (",district_list,")");
	end if;
    
    
    /* Create a event id filter statement string */
    if(event_list = '') then 
		set @event_id_string = CONCAT("EventId IN (select distinct EventId from DMHPv1.tbl_training)");
	else 
		set @event_id_string = CONCAT("EventId IN (", event_list, ")");
	end if;
    
    /* Create a targeted group id filter statement string */
    if(target_group_list = '') then
		set @target_group_id_string = CONCAT("TargetGrpId IN (select distinct TargetGrpId from DMHPv1.tbl_training)");
	else 
		set @target_group_id_string = CONCAT("TargetGrpId IN (", target_group_list, ")");
	end if;
    
    /* Create a resource id filter statement string */
    if(resource_list = '') then
		set @resource_id_string = CONCAT("ResourceId IN (select distinct ResourceId from DMHPv1.tbl_training)");
	else 
		set @resource_id_string = CONCAT("ResourceId IN (", resource_list, ")");
	end if;
    
    /* Filter by Start date and End Date */
    if(start_date = '0000-00-00' and end_date = '0000-00-00') then 
		set @date_filter_string = CONCAT("EventFrom BETWEEN '", @MinEventFrom , "' and '", @MaxEventFrom, "'");
	elseif(start_date = '0000-00-00') then
		set @date_filter_string = CONCAT("EventFrom <= '", end_date, "'");
	elseif(end_date = '0000-00-00') then
		set @date_filter_string = CONCAT("EventFrom >= '", start_date, "'");
	else 
		set @date_filter_string = CONCAT("EventFrom BETWEEN '", start_date, "' and '", end_date , "'");
	end if;
     
		
    /* PRINTING STATEMENTS */
    select concat(@MaxEventFrom);
    select concat("district id string -> ", @district_id_string);
    select concat("date filter string -> ", @date_filter_string);
    
    
    /* CREATING STATEMENT*/
	set @statement = concat(
			"select * from tbl_training where StateId = 17 and ",
            @district_id_string," and ", 
            @event_id_string, " and ", 
            @target_group_id_string, " and ", 
            @resource_id_string, " and ",
            @date_filter_string);
	
    select concat(@statement);
    
    prepare stmt from @statement;
    execute stmt;
    deallocate prepare stmt;
END
