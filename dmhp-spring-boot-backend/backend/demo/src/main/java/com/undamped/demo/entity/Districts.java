package com.undamped.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.Date;

@Entity
@Data // Lombok - code reducer
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Districts")
public class Districts {


    /*
    `DistrictId` int(11) NOT NULL,
  `StateId` int(11) NOT NULL,
  `District` varchar(16) NOT NULL,
  `HospitalName` varchar(25) NOT NULL,
  `SancBeds` int(11) NOT NULL,
  `RegDate` date NOT NULL,
  `CreatedDate` date NOT NULL,
  `IsActive` bit(1) NOT NULL,
  `CreatedBy` varchar(10) NOT NULL,
  `Population` int(11) DEFAULT NULL,
  PRIMARY KEY (`DistrictId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

     */

    /*

    Min Queries:
    DistrictID
    StateID
    District

     */


    @Id
    @Positive
    // @GeneratedValue(strategy = GenerationType.AUTO)
    private Long DistrictId;

    @Positive
    private Long StateId;

    @Column(length = 16)
    @NotBlank
    private String District;

    @Column(length = 25)
    @NotBlank
    private String HospitalName;

    @Positive
    private Long SancBeds;

    @JsonFormat(pattern = "yyyy/dd/MM")
    private Date RegDate;

    @JsonFormat(pattern = "yyyy/dd/MM")
    private Date CreatedDate;

    private Boolean IsActive;

    @Column(length = 10)
    @NotBlank
    private String CreatedBy;

    @NotBlank
    private Long Population;


}
