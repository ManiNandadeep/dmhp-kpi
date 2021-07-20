package com.undamped.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class tbl_budgetallocationId implements Serializable {

    private Long BudgetId;
    private Long DistrictId;
    private String FinancialYear;
    private Long StateId;

}