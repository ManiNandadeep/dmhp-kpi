package com.undamped.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Date;

@Entity
@Data // Lombok - code reducer
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(tbl_budgetallocationId.class)
public class tbl_budgetallocation {

    /*
   `BudgetId` int(11) NOT NULL,
  `DistrictId` int(11) NOT NULL,
  `FinancialYear` varchar(50) NOT NULL,
  `StateId` int(11) NOT NULL,
  `TotalBudgetAllocated` double DEFAULT NULL,
  `QuaterlyId` int(11) DEFAULT NULL,
  `QuaterlyReleasedAmt` double DEFAULT NULL,
  `QuaterlyRealeasedDate` date DEFAULT NULL,
  `QuaterlyRemarks` varchar(500) DEFAULT NULL,
  `ReleasedBy` varchar(50) DEFAULT NULL,
  `Createddate` date DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`BudgetId`,`DistrictId`,`FinancialYear`,`StateId`)
  */

    @Id
    @Positive
    private Long BudgetId;

    @Id
    @Positive
    private Long DistrictId;

    @Id
    @NotNull
    private String FinancialYear;

    @Id
    @Positive
    private Long StateId;

    @Positive
    private Double TotalBudgetAllocated;

    @NotBlank
    private Long QuaterlyId;

    @Positive
    private Double QuaterlyReleasedAmt;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date QuaterlyRealeasedDate;

    @Column(length = 500)
    @NotBlank
    private String QuaterlyRemarks;

    @Column(length = 50)
    @NotBlank
    private String ReleasedBy;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date Createddate;

    @ColumnDefault("1")
    private int IsActive;
}
