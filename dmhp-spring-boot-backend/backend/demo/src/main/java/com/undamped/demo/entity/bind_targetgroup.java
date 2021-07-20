package com.undamped.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Positive;

@Entity
@Data // Lombok - code reducer
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class bind_targetgroup {


/*
    CREATE TABLE `bind_targetgroup` (
            `TargetGroupId` int(11) NOT NULL,
              `TargetGroupName` varchar(150) DEFAULT NULL,
              `TGGroupId` int(11) DEFAULT NULL,
                PRIMARY KEY (`TargetGroupId`)`
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

    @Id
    @Positive
    // @GeneratedValue(strategy = GenerationType.AUTO)
    private Long TargetGroupId;

    @Column(length = 150)
    @Value("${stuff.value:#{null}}")
    private String TargetGroupName;

    private Long TGGroupId;


}