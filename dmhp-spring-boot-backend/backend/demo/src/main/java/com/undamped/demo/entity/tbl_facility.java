package com.undamped.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.Date;

@Entity
@Data // Lombok - code reducer
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class tbl_facility {

    @Id
    @Positive
    // @GeneratedValue(strategy = GenerationType.AUTO)
    private Long FacilityId;

    @NotBlank
    private Long StateId;

    @NotBlank
    private Long DistrictId;

    @NotBlank
    private Long TalukaId;

    @NotBlank
    private Long FacilityTypeId;

    @NotBlank
    private String Facility;

    @NotBlank
    private String HospitalName;

    @Positive
    private Long SancBeds;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date RegDate;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date CreatedDate;

    private Boolean IsActive;

    @NotBlank
    private String CreatedBy;

    @Positive
    private Long RefId;
}
