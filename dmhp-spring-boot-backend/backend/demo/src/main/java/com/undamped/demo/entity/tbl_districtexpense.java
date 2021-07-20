package com.undamped.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Positive;
import java.util.Date;

@Entity
@Data // Lombok - code reducer
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class tbl_districtexpense {

    @Id
    @Positive
    private Long BudgetExpenseId;

    @Nullable
    private Long DistrictId;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date ReportingMonthYear;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date ReportingDate;

    @Nullable
    private Double Salary;

    @Nullable
    private Double B3032_Psychiatrists;

    @Nullable
    private Double B30112_Psyst_Counsellor;

    @Nullable
    private Double B30114_SocialWorker;

    @Nullable
    private Double B3012_StaffNurse;

    @Nullable
    private Double B3012_PsyNurse;

    @Nullable
    private Double B30137_MedialRedAsst;

    @Nullable
    private Double B30137_WardAsst;

    @Nullable
    private Double Infrastucture;

    @Nullable
    private Double Training;

    @Nullable
    private Double IEC;

    @Nullable
    private Double TargetIntervention;

    @Nullable
    private Double Drugs;

    @Nullable
    private Double Equipments;

    @Nullable
    private Double OperationExpense;

    @Nullable
    private Double AmbulatoryService;

    @Nullable
    private Double Miscellanious;

    @Column(length = 500)
    @Nullable
    private String Remarks;

    @Column(length = 50)
    @Nullable
    private String SubmittedBy;

    @ColumnDefault("1")
    private int IsActive;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date CreatedDate;

    @Nullable
    private Long StatusId;

    @Nullable
    private Double StateStaff1;

    @Nullable
    private Double StateStaff2;

    @Nullable
    private Long StateId;

    @Nullable
    private Double B3032_PsychiatristsTA;

    @Nullable
    private Double B30114_SocialWorkerTA;

    @Nullable
    private Double B10162_Awarness;

    @Nullable
    private Double J17_Contingency;

    @Nullable
    private Double J18_InnovationMH;

    @Nullable
    private Double B2030_AnnualIncrement;


}
