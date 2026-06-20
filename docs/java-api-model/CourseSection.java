package dev.joaquinc.academy.model;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CourseSection {

    private String id;
    private String title;
    private Integer order;
    private Integer hoursPerSection;
    private List<String> specificTopics;

    /** Nombre de icono Lucide para la UI (ej. "book-open", "code"). */
    private String icon;
}
