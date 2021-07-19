/*
	VERSION - 1,02
*/

CREATE DEFINER=`root`@`localhost` PROCEDURE `getMnsAlloAction`(
	IN display varchar(200),
	IN group_by varchar(200),
    IN agg varchar(200),
	IN district_list varchar(200),
    IN quaterly_list varchar(200),
    IN financial_year varchar(50))
BEGIN
	/*
		display
		group_by
		agg
		
        district_list
		quaterly_list : SPELLING!
		financial_year		
    */
    
	DECLARE district_id_string varchar(300);
    DECLARE quaterly_id_string varchar(300);
    DECLARE agg_string varchar(500);
    DECLARE display_string varchar(500);
    DECLARE group_by_string  varchar(500);
    DECLARE financial_year_string varchar(50);
    
    SET @display_string=NULL;
    SET @group_by_string = NULL;
	SET @agg_string = NULL;
    
    
    SET @total_expense_string = "(SUM(RHead_15) + SUM(RHead_59) + 
		SUM(RHead_71) + SUM(RHead_195) + SUM(RHead_195) + SUM(RHead_200) +
        SUM(RHead_235) + SUM(RHead_222)) as TotalExpense";
    
    
	/* Create a district id filter statement string */
    if(district_list = '') then
		set @district_id_string = CONCAT("DistrictId IN (select distinct DistrictId from DMHPv1.Districts)");
	else
		set @district_id_string = CONCAT("DistrictId IN (",district_list,")");
	end if;
    
    if(quaterly_list = '') then
		set @quaterly_id_string = CONCAT("QuaterlyId IN (select distinct QuaterlyId from DMHPv1.tbl_mnsalloaction)");
	else
		set @quaterly_id_string = CONCAT("QuaterlyId IN (",quaterly_list,")");
	end if;

	if(financial_year = '') then
		set @financial_year_string = CONCAT("FinancialYear IN (select distinct FinancialYear from DMHPv1.tbl_mnsalloaction)");
	else
		set @financial_year_string = CONCAT("FinancialYear IN ('",financial_year,"')");
	end if;
	
    
    
    /* Display statements */
    IF(FIND_IN_SET('FundAllocationId',display))THEN
			SET @display_string=CONCAT("FundAllocationId");
		END IF;
        
    IF(FIND_IN_SET('DistrictId',display))THEN
		IF(@display_string is NULL)THEN
			SET @display_string=CONCAT("DistrictId");
		ELSE
			SET @display_string=CONCAT(@display_string,",DistrictId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('QuaterlyId',display))THEN
		IF(@display_string is NULL)THEN
			SET @display_string=CONCAT("QuaterlyId");
		ELSE
			SET @display_string=CONCAT(@display_string,",QuaterlyId");
		END IF;
	END IF;

	IF(FIND_IN_SET('FinancialYear',display))THEN
		IF(@display_string is NULL)THEN
			SET @display_string=CONCAT("FinancialYear");
		ELSE
			SET @display_string=CONCAT(@display_string,",FinancialYear");
		END IF;
	END IF;
    
    /* Aggregation statements */
    If(FIND_IN_SET('RHead_15',agg))THEN
		SET @agg_string = CONCAT("SUM(RHead_15) as RHead_15");
	END IF;
    
    
     IF(FIND_IN_SET('RHead_59',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string = CONCAT("SUM(RHead_59) as RHead_59");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(RHead_59) as RHead_59");
		END IF;
	END IF;
    
    
    IF(FIND_IN_SET('RHead_71',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(RHead_71) as RHead_71");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(RHead_71) as RHead_71");
		END IF;
	END IF;
	
    
    IF(FIND_IN_SET('RHead_195',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(RHead_195) as RHead_195");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(RHead_195) as RHead_195");
		END IF;
	END IF;
    
    
    IF(FIND_IN_SET('RHead_200',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(RHead_200) as RHead_200");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(RHead_200) as RHead_200");
		END IF;
	END IF;
    
    
    IF(FIND_IN_SET('RHead_235',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(RHead_235) as RHead_235");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(RHead_235) as RHead_235");
		END IF;
	END IF;
    
	
    IF(FIND_IN_SET('RHead_222',agg))THEN
		IF(@agg_string is NULL) THEN
			SET @agg_string =CONCAT("SUM(RHead_222) as RHead_222");
		ELSE
			SET @agg_string = CONCAT(@agg_string,",SUM(RHead_222) as RHead_222");
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
    IF(FIND_IN_SET('FundAllocationId',group_by)) THEN
		set @group_by_string = CONCAT("FundAllocationId");
	END IF;
    
    
    IF(FIND_IN_SET('DistrictId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("DistrictId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",DistrictId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('QuaterlyId',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("QuaterlyId");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",QuaterlyId");
		END IF;
	END IF;
    
    IF(FIND_IN_SET('FinancialYear',group_by)) THEN
		IF(@group_by_string is NULL) THEN
			set @group_by_string = CONCAT("FinancialYear");
		ELSE
			set @group_by_string = CONCAT(@group_by_string,",FinancialYear");
		END IF;
	END IF;
    
    set @statement = CONCAT("select ", @display_string ,",", @agg_string ," from DMHPv1.tbl_mnsalloaction where StateId = 17 and ", @district_id_string, " and ", @quaterly_id_string, " and ", @financial_year_string, " GROUP BY ", @group_by_string);
    
    select concat(@statement);
    prepare stmt from @statement;
    execute stmt;
    deallocate prepare stmt;
END
