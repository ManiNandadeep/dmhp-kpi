CREATE DEFINER=`root`@`localhost` PROCEDURE `getTraining`(
	IN display varchar(200),
	IN district_list varchar(200), 
    IN event_list varchar(200), 
    IN target_group_list varchar(200),
    IN resource_list varchar(200),
    IN start_date date,
    IN end_date date,
    IN timeperiod_type varchar(200),
    IN year_type varchar(200))
BEGIN
	
    /*
		Display 
        
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
        TimePeriod -> annually,quarterly,monthly
    */

	/* Declaring session variables*/
	DECLARE district_id_string varchar(300);
    DECLARE event_id_string varchar(300);
	DECLARE target_group_id_string varchar(300);
    DECLARE resource_id_string varchar(300);
    DECLARE date_filter_string varchar(300);
    DECLARE MaxEventFrom date;
    DECLARE MinEventFrom date;
    DECLARE display_string varchar(500);
    
    set @display_string=NULL;
    
    SELECT MIN(EventFrom) INTO @MinEventFrom FROM DMHPv1.tbl_training;
    SELECT MAX(EventFrom) INTO @MaxEventFrom FROM DMHPv1.tbl_training;
    
    
     SET @financial:=CONCAT("CASE WHEN MONTH(EventFrom) BETWEEN 4 AND 12 THEN
	 concat(YEAR(EventFrom), '-',YEAR(EventFrom)+1)
	 WHEN MONTH(EventFrom) BETWEEN 1 AND 3 THEN
	 concat(YEAR(EventFrom)-1,'-', YEAR(EventFrom)) 
	 END ");
	
    /* Create a district id filter statement string */
    if(district_list = '') then
		set @district_id_string = CONCAT("DistrictId IN (select distinct DistrictId from DMHPv1.Districts)");
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
    
    
    /* The below code corresponds to displaying wrt */
    if (FIND_IN_SET('DistrictId',display)) then
		set @display_string = CONCAT("DistrictId");
	end if;
    
    IF(FIND_IN_SET('ReportingMonthyear',display))THEN
		IF(timeperiod_type='annually')THEN
			IF (year_type='c') THEN
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT("YEAR(EventFrom)");
				ELSE
					SET @display_string=CONCAT(@display_string,",YEAR(EventFrom)");
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
		IF(timeperiod_type='quarterly')THEN
			IF (year_type='c') THEN
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT("YEAR(EventFrom),QUARTER(EventFrom)as Quarter");
				ELSE
					SET @display_string=CONCAT(@display_string,",YEAR(EventFrom), QUARTER(EventFrom) as Quarter");
				END IF;
			ELSE
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT(@financial," as financial_year, QUARTER(EventFrom)-1 as Quarter");
				ELSE
					SET @display_string=CONCAT(@display_string,",",@financial," as financial_year, QUARTER(EventFrom)-1 as Quarter");
				END IF;
			END IF;
        END IF;
     END IF;
     
	IF(FIND_IN_SET('ReportingMonthyear',display))THEN
		IF(timeperiod_type='monthly')THEN
			IF(@display_string is NULL)THEN
				SET @display_string=CONCAT("EventFrom");
			ELSE
				SET @display_string=CONCAT(@display_string,",EventFrom");
			END IF;
        END IF;
	END IF;
    
		
    /* PRINTING STATEMENTS 
    select concat(@MaxEventFrom);
    select concat("district id string -> ", @district_id_string);
    select concat("date filter string -> ", @date_filter_string);
    */
    
    /* CREATING STATEMENT*/
	set @statement = concat(
			"select ", @display_string,
            ",noOfPatients from tbl_training where StateId = 17 and ",
            @district_id_string," and ", 
            @event_id_string, " and ", 
            @target_group_id_string, " and ", 
            @resource_id_string, " and ",
            @date_filter_string); 
            
	set @numPatients = concat(
			"select SUM(noOfPatients) from tbl_training where StateId = 17 and ",
            @district_id_string," and ", 
            @event_id_string, " and ", 
            @target_group_id_string, " and ", 
            @resource_id_string, " and ",
            @date_filter_string); 
            
	set @finalstatement = @statement;
            
          
    prepare stmt from @finalstatement;
    execute stmt;
    deallocate prepare stmt;
    
    
END