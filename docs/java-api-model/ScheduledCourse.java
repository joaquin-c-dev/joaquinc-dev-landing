package dev.joaquinc.academy.model;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ScheduledCourse {

    private String id;
    private Course course;

    private String instructorId;
    private String courseId;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private CourseModality courseModality;
    private TimeSchedule timeSchedule;

    private String zoomMeetingId;
    private String note;

    private LocalDateTime updatedDate;
    private LocalDateTime creationDate;

    public enum CourseModality {
        SATURDAY,
        MONDAY_TO_THURSDAY
    }

    public enum TimeSchedule {
        FROM_9AM_TO_2PM,
        FROM_8PM_TO_10PM
    }
}
