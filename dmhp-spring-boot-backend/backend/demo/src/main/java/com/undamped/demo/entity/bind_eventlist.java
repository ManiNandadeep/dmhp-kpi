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
import javax.validation.constraints.Size;

@Entity
@Data // Lombok - code reducer
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class bind_eventlist {



   /*
   CREATE TABLE `bind_eventlist` (
  `EventId` int(11) NOT NULL,
  `EventName` varchar(50) DEFAULT NULL
)

    */


    @Id
    @Positive
    // @GeneratedValue(strategy = GenerationType.AUTO)
    private Long EventId;

    @Column(length = 50)
    @Value("${stuff.value:#{null}}")
    private String EventName;


}