CREATE DEFINER=`root`@`localhost` PROCEDURE `getTraining`(
	IN display varchar(200),
    IN group_by varchar(200),
	IN district_list varchar(200), 
    IN facility_list varchar(200),
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
        Group by
        
		StateId
		DistrictId
        FacilityTypeId 
        
        EventId
        TargetGrpId
        ResourceId
        
        Start Date
	    End Date
        TimePeriod -> annually,quarterly,monthly
        CalenderType -> c/f
        
        SensitizationId ?
    */


	/* Declaring session variables*/
	DECLARE district_id_string varchar(300);
    DECLARE facility_id_string varchar(300);
    DECLARE event_id_string varchar(300);
	DECLARE target_group_id_string varchar(300);
    DECLARE resource_id_string varchar(300);
    DECLARE date_filter_string varchar(300);
    DECLARE MaxEventFrom date;
    DECLARE MinEventFrom date;
    DECLARE display_string varchar(500);
    
    set @display_string=NULL;
    set @group_by_string=NULL;
    
    SELECT MIN(EventFrom) INTO @MinEventFrom FROM DMHPv1.tbl_training;
    SELECT MAX(EventFrom) INTO @MaxEventFrom FROM DMHPv1.tbl_training;
    
    
     SET @financial:=CONCAT("CASE WHEN MONTH(EventFrom) BETWEEN 4 AND 12 THEN
	 concat(YEAR(EventFrom), '-',YEAR(EventFrom)+1)
	 WHEN MONTH(EventFrom) BETWEEN 1 AND 3 THEN
	 concat(YEAR(EventFrom)-1,'-', YEAR(EventFrom)) 
	 END ");
     
     SET @fquarter:=CONCAT("CASE 
	 WHEN QUARTER(EventFrom) = 1 THEN 4
	 WHEN QUARTER(EventFrom) = 2 THEN 1
	 WHEN QUARTER(EventFrom) = 3 THEN 2
	 WHEN QUARTER(EventFrom) = 4 THEN 3
	 END ");
     
	
    /* FILTER WHERE LOGIC */
    
    /* Create a district id filter statement string */
    if(district_list = '') then
		set @district_id_string = CONCAT("DistrictId IN (select distinct DistrictId from DMHPv1.Districts)");
	else
		set @district_id_string = CONCAT("DistrictId IN (",district_list,")");
	end if;
    
    
    /* Create a facility id filter statement string */
    if(facility_list = '') then 
		set @facility_id_string = CONCAT("FacilityTypeId IN (select distinct FacilityTypeId from DMHPv1.tbl_training)");
	else 
		set @facility_id_string = CONCAT("FacilityTypeId IN (",facility_list,")");
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
    if(start_date IS NULL and end_date IS NULL) then 
		set @date_filter_string = CONCAT("EventFrom BETWEEN '", @MinEventFrom , "' and '", @MaxEventFrom, "'");
	elseif(start_date IS NULL) then
		set @date_filter_string = CONCAT("EventFrom <= '", end_date, "'");
	elseif(end_date IS NULL) then
		set @date_filter_string = CONCAT("EventFrom >= '", start_date, "'");
	else 
		set @date_filter_string = CONCAT("EventFrom BETWEEN '", start_date, "' and '", end_date , "'");
	end if;
    
    
    
    /* The below code corresponds to displaying wrt */
    if (FIND_IN_SET('DistrictId',display)) then
		set @display_string = CONCAT("DistrictId");
	end if;
    
    
    IF (FIND_IN_SET('EventId',display)) THEN
		IF(@display_string is NULL) THEN 
			set @display_string = CONCAT("EventId");
		ELSE 
			set @display_string = CONCAT(@display_string,",EventId");
		END IF;
    END IF;
    
    
    IF (FIND_IN_SET('TargetGrpId',display)) THEN
		IF(@display_string is NULL) THEN 
			set @display_string = CONCAT("TargetGrpId");
		ELSE 
			set @display_string = CONCAT(@display_string,",TargetGrpId");
		END IF;
    END IF;
    
    
    IF (FIND_IN_SET('ResourceId',display)) THEN
		IF(@display_string is NULL) THEN 
			set @display_string = CONCAT("ResourceId");
		ELSE 
			set @display_string = CONCAT(@display_string,",ResourceId");
		END IF;
    END IF;
    
    
    IF (FIND_IN_SET('EventFrom',display)) THEN
		IF(@display_string is NULL) THEN 
			set @display_string = CONCAT("EventFrom");
		ELSE 
			set @display_string = CONCAT(@display_string,",EventFrom");
		END IF;
    END IF;
    
    
    IF (FIND_IN_SET('EventTo',display)) THEN
		IF(@display_string is NULL) THEN 
			set @display_string = CONCAT("EventTo");
		ELSE 
			set @display_string = CONCAT(@display_string,",EventTo");
		END IF;
    END IF;
    
    
    IF (FIND_IN_SET('FacilityTypeId',display)) THEN
		IF(@display_string is NULL) THEN 
			set @display_string = CONCAT("FacilityTypeId");
		ELSE 
			set @display_string = CONCAT(@display_string,",FacilityTypeId");
		END IF;
    END IF;
    
    
    IF(FIND_IN_SET('ReportingMonthyear',display))THEN
		IF(timeperiod_type='annually')THEN
			IF (year_type='c') THEN
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT("YEAR(EventFrom) as Year");
				ELSE
					SET @display_string=CONCAT(@display_string,",YEAR(EventFrom) as Year");
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
					SET @display_string=CONCAT("YEAR(EventFrom) as Year,QUARTER(EventFrom)as Quarter");
				ELSE
					SET @display_string=CONCAT(@display_string,",YEAR(EventFrom) as Year, QUARTER(EventFrom) as Quarter");
				END IF;
			ELSE
				IF(@display_string is NULL)THEN
					SET @display_string=CONCAT(@financial," as financial_year, ",@fquarter," as Quarter");
				ELSE
					SET @display_string=CONCAT(@display_string,",",@financial," as financial_year, ",@fquarter," as Quarter");
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
    
    
    
    /* GROUP BY filtration */
    IF(FIND_IN_SET('TrainingId',group_by)) THEN
		set @group_by_string = CONCAT("TrainingId");
	END IF;
    
    
    IF(FIND_IN_SET('DistrictId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("DistrictId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",DistrictId");
		END IF;
	END IF;
    
    
    IF(FIND_IN_SET('financial_year',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("financial_year");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",financial_year");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Year',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("Year");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",Year");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('Quarter',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("Quarter");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",Quarter");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('EventId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("EventId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",EventId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('FacilityTypeId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("FacilityTypeId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",FacilityTypeId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('ResourceId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("ResourceId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",ResourceId");
		END IF;
	END IF;
    
    
    IF(FIND_IN_SET('TargetGrpId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("TargetGrpId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",TargetGrpId");
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
            ",sum(noOfPatients),count(TrainingId) from tbl_training where StateId = 17 and ",
            @district_id_string," and ",
            @facility_id_string," and ",
            @event_id_string, " and ", 
            @target_group_id_string, " and ", 
            @resource_id_string, " and ",
            @date_filter_string, " group by ",
            @group_by_string); 

	
	select concat(@statement);
    prepare stmt from @statement;
    execute stmt;
    deallocate prepare stmt;

END
