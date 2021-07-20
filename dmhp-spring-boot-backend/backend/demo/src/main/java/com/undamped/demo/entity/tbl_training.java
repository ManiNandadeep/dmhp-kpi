package com.undamped.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data // Lombok - code reducer
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class tbl_training {

    /*
    CREATE TABLE `tbl_training` (
  `TrainingId` int(11) NOT NULL,
  `StateId` int(11) NOT NULL,
  `DistrictId` int(11) NOT NULL,
  `EventId` int(11) DEFAULT NULL,
  `TargetGrpId` int(11) DEFAULT NULL,
  `ResourceId` int(11) DEFAULT NULL,
  `SpecifyOther` varchar(500) DEFAULT NULL,
  `EventFrom` datetime(6) DEFAULT NULL,
  `EventTo` datetime(6) DEFAULT NULL,
  `NoOfPatients` int(11) DEFAULT NULL,
  `NameOfFacility` varchar(100) DEFAULT NULL,
  `TrnReport` varchar(500) DEFAULT NULL,
  `NameOfTeam` varchar(500) DEFAULT NULL,
  `ImageUrl1` longblob,
  `ImageUrl2` longblob,
  `ImageUrl3` longblob,
  `ImgPath1` varchar(500) DEFAULT NULL,
  `ImgPath2` varchar(500) DEFAULT NULL,
  `ImgPath13` varchar(500) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT '1',
  `CreatedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `SubmittedBy` varchar(150) DEFAULT NULL,
  `TGroupSpecifyOther` varchar(150) DEFAULT NULL,
  `RSpecifyOther` varchar(500) DEFAULT NULL,
  `FacilityTypeId` int(11) DEFAULT NULL,
  `FTSpecifyOther` varchar(500) DEFAULT NULL,
  `DesignationRefId` int(11) DEFAULT NULL,
  `SensitizationRefId` int(11) DEFAULT NULL,
  `DesignationOther` varchar(100) DEFAULT NULL,
  `SensitizationOther` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`TrainingId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
     */


    @Id
    @Positive
    private Long TrainingId;

    @NotBlank
    private Long StateId;

    @NotBlank
    private Long DistrictId;

    @Nullable
    private Long EventId;

    @Nullable
    private Long TargetGrpId;

    @Nullable
    private Long ResourceId;

    @Column(length = 500)
    @Nullable
    private String SpecifyOther;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime EventFrom;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime EventTo;

    @Positive
    @Nullable
    private Long NoOfPatients;

    @Column(length = 100)
    @Nullable
    private String NameOfFacility;

    @Column(length = 500)
    @Nullable
    private String TrnReport;

    @Column(length = 500)
    @Nullable
    private String NameOfTeam;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] ImageUrl1;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] ImageUrl2;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] ImageUrl3;

    @Column(length = 500)
    @Nullable
    private String ImgPath1;

    @Column(length = 500)
    @Nullable
    private String ImgPath2;

    @Column(length = 500)
    @Nullable
    private String ImgPath13;

    private Long IsActive;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime CreatedDate;

    @Column(length = 150)
    @Nullable
    private String SubmittedBy;

    @Column(length = 150)
    @Nullable
    private String TGroupSpecifyOther;

    @Column(length = 500)
    @Nullable
    private String RSpecifyOther;

    @Positive
    private Long FacilityTypeId;

    @Column(length = 500)
    @Nullable
    private String FTSpecifyOther;

    @Positive
    private Long DesignationRefId;

    @Positive
    private Long SensitizationRefId;

    @Column(length = 100)
    @Nullable
    private String DesignationOther;

    @Column(length = 100)
    @Nullable
    private String SensitizationOther;








}
