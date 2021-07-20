package com.undamped.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.Date;

@Entity
@Data // Lombok - code reducer
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class tbl_taluka {


    
    /*
  `TalukaId` int(11) NOT NULL,
  `DistrictId` int(11) NOT NULL,
  `StateId` int(11) DEFAULT NULL,
  `Taluka` varchar(50) DEFAULT NULL,
  `HospitalName` varchar(50) DEFAULT NULL,
  `SancBeds` int(11) DEFAULT NULL,
  `RegDate` date DEFAULT NULL,
  `CreatedDate` date DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT '1',
  `CreatedBy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`TalukaId`)
 */


    @Id
    @Positive
    // @GeneratedValue(strategy = GenerationType.AUTO)
    private Long TalukaId;

    @Positive
    private Long DistrictId;

    @NotBlank
    private Long StateId;

    @Column(length = 50)
    @NotBlank
    private String Taluka;

    @Column(length = 50)
    @NotBlank
    private String HospitalName;

    @Positive
    private Long SancBeds;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date RegDate;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date CreatedDate;

    @ColumnDefault("1")
    private int IsActive;

    @NotBlank
    private String CreatedBy;


}