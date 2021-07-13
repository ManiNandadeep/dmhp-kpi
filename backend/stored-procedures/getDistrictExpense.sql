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
    
    set @statement = CONCAT("select * from DMHPv1.tbl_DistrictExpense where StateId = 17");
    
    # select concat(@statement);
    prepare stmt from @statement;
    execute stmt;
    deallocate prepare stmt;
END
