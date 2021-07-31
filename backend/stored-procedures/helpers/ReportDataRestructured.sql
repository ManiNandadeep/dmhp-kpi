CREATE TABLE DMHPv1.Reportdata_restructured as
	SELECT ReportId,StateId,DistrictId,TalukaId,MncHospitalId,1 as FacilityTypeId,'Primary Health Center' 				FacilityType,FacilityId,ReportingMonthyear,'old' as VisitType,'M' as Gender,'OP' as ConsultType,
		old_smd_male as SMD,old_cmd_male as CMD,old_male_suicidecases as SuicideAttempts,old_o1_male as Epilepsy,
        old_alcohal_male as AlcoholSubstanceAbuse,old_o5_male as Dementia,old_o2_male as DevelopmentalDisorders,
        old_o3_male as BehaviouralDisorders,old_o4_male as EmotionalDisorders,old_psychiatricdisorders_male as PsychiatricDisorders,
        old_o6_male as Others,old_male_reffered_to_highercenters as Referred,old_smd_male+old_cmd_male+old_male_suicidecases+old_o1_male+
        old_alcohal_male+old_o5_male+old_o2_male+old_o3_male+old_o4_male+old_psychiatricdisorders_male+old_o6_male+old_male_reffered_to_highercenters
        as TotalPatient from DMHPv1.tbl_reportdata
        
												UNION ALL
                                                
	SELECT ReportId,StateId,DistrictId,TalukaId,MncHospitalId,1 as FacilityTypeId,'Primary Health Center' 				FacilityType,FacilityId,ReportingMonthyear,'old' as VisitType,'F' as Gender,'OP' as ConsultType,
		old_smd_female as SMD,old_cmd_female as CMD ,old_female_suicidecases as SuicideAttempts,old_o1_female as Epilepsy,
        old_alcohal_female as AlcoholSubstanceAbuse,old_o5_female as Dementia,old_o2_female as DevelopmentalDisorders,
        old_o3_female as BehaviouralDisorders,old_o4_female as EmotionalDisorders,old_psychiatricdisorders_female as PsychiatricDisorders, 
        old_o6_female as Others,old_female_reffered_to_highercenters as Referred,old_smd_female+old_cmd_female+old_female_suicidecases+old_o1_female+
        old_alcohal_female+old_o5_female+old_o2_female+old_o3_female+old_o4_female+old_psychiatricdisorders_female+old_o6_female+old_female_reffered_to_highercenters 
        as TotalPatient from DMHPv1.tbl_reportdata
        
												UNION ALL
        
	SELECT ReportId,StateId,DistrictId,TalukaId,MncHospitalId,1 as FacilityTypeId,'Primary Health Center' 				FacilityType,FacilityId,ReportingMonthyear,'new' as VisitType,'M' as Gender,'OP' as ConsultType,
		new_smd_male as SMD,new_cmd_male as CMD,new_male_suicidecases as SuicideAttempts,new_o1_male as Epilepsy,
        new_alcohal_male as AlcoholSubstanceAbuse,new_o5_male as Dementia,new_o2_male as DevelopmentalDisorders, 
        new_o3_male as BehaviouralDisorders,new_o4_male as EmotionalDisorders,new_psychiatricdisorders_male as PsychiatricDisorders, 
        new_o6_male as Others,new_male_reffered_to_highercenters as Referred,new_smd_male+new_cmd_male+new_male_suicidecases+new_o1_male+
        new_alcohal_male+new_o5_male+new_o2_male+new_o3_male+new_o4_male+new_psychiatricdisorders_male+new_o6_male+new_male_reffered_to_highercenters 
        as TotalPatient from DMHPv1.tbl_reportdata
        
												UNION ALL
                        
	SELECT ReportId,StateId,DistrictId,TalukaId,MncHospitalId,1 as FacilityTypeId,'Primary Health Center' 			         FacilityType,FacilityId,ReportingMonthyear,'new' as VisitType,'F' as Gender,'OP' as ConsultType,
		new_smd_female as SMD,new_cmd_female as CMD,new_female_suicidecases as SuicideAttempts,new_o1_female as Epilepsy,
        new_alcohal_female as AlcoholSubstanceAbuse,new_o5_female as Dementia,new_o2_female as DevelopmentalDisorders, 
        new_o3_female as BehaviouralDisorders,new_o4_female as EmotionalDisorders,new_psychiatricdisorders_female as PsychiatricDisorders,
        new_o6_female as Others,new_female_reffered_to_highercenters as Referred,new_smd_female+new_cmd_female+new_female_suicidecases+new_o1_female+
        new_alcohal_female+new_o5_female+new_o2_female+new_o3_female+new_o4_female+new_psychiatricdisorders_female+new_o6_female+new_female_reffered_to_highercenters
        as TotalPatient from DMHPv1.tbl_reportdata
						
												UNION ALL
                        
	SELECT ReportId,StateId,DistrictId,TalukaId,MncHospitalId,1 as FacilityTypeId,'Primary Health Center'                 	   		FacilityType,FacilityId,ReportingMonthyear,'N' as VisitType,'N' as Gender,'IP' as ConsultType, 
		InPatient_1 as SMD,InPatient_2 as CMD,InPatient_6 as SuicideAttempts,InPatient_7 as Epilepsy,
        InPatient_3 as AlcoholSubstanceAbuse, InPatient_11 as Dementia,InPatient_8 as DevelopmentalDisorders, 
        InPatient_9 as BehaviouralDisorders,InPatient_10 as EmotionalDisorders,InPatient_5 as PsychiatricDisorders,
        InPatient_12 as Others,InPatient_4 as Referred,InPatient_1+InPatient_2+InPatient_6+InPatient_7+InPatient_3+InPatient_11+
        InPatient_8+InPatient_9+InPatient_10+InPatient_12+InPatient_5+InPatient_4 as TotalPatient from DMHPv1.tbl_reportdata;
