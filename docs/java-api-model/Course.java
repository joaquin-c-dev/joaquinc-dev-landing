package dev.joaquinc.academy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Course {

    private String id;
    private String slug;
    private String title;
    private String description;
    private String image;
    private Double durationInHours;
    private List<CourseSection> sections;
    private Status status = Status.ACTIVE;
    private Type type;
    private String topicsUrl;

    private String subtitle;
    private String level;

    // SEO
    private String seoTitle;
    private String seoDescription;
    private String seoKeywords;
    private String seoOgImage;

    // Listing (home)
    private String listingIcon;
    private String listingColor;
    private String listingBgColor;
    private String listingBorderColor;
    private List<String> listingFeatures;
    private Boolean listingFeatured;
    private Boolean showOnHome;

    // Hero
    private String heroTitleLine1;
    private String heroTitleHighlight;
    private String heroTitleLine2;
    private String heroDescription;
    private HeroLayout heroLayout;
    private String heroVideoSrc;
    private String heroVideoPoster;
    private String heroStripeUrl;
    private String heroSecondaryCtaLabel;
    private String heroSecondaryCtaHref;
    private String heroSecondaryCtaScrollTo;

    // Promocion
    private OffsetDateTime promotionEndsAt;
    private String promotionBannerDesktop;
    private String promotionBannerMobile;

    // Precios
    private String pricingSubtitle;
    private Double fullPrice;
    private Double discountPrice;
    private String stripeUrl;
    private String stripePromoUrl;
    private String whatsappCourseName;
    private String promoCodeLabel;
    private List<String> recommendedModalConditions;
    private String recommendedModalNote;

    // Prerrequisitos
    private String prerequisitesIntro;
    private List<String> prerequisiteItems;
    private List<String> prerequisiteEquipment;
    private String prerequisiteEquipmentNote;
    private String prerequisiteCourseSlug;
    private String prerequisiteCourseLinkLabel;
    private String prerequisitesFooterNote;
    private String prerequisitesNoExperienceNote;

    // Temario (metadata UI)
    private String curriculumSectionId;
    private String curriculumSummary;
    private List<String> methodologyTitles;
    private List<String> methodologyDescriptions;

    // Proximos inicios (metadata UI)
    private String schedulesSubtitle;
    private Boolean schedulesFullHeight;

    // Taller (type = WORKSHOP)
    private String workshopBadge;
    private List<String> workshopFeatures;
    private String workshopPrice;
    private String workshopPriceNote;
    private String workshopStripeUrl;
    private String workshopPaypalUrl;
    private List<String> workshopMetaLabels;
    private List<String> workshopMetaValues;
    private List<String> workshopScheduleBlockTitles;
    private List<String> workshopScheduleBlockDescriptions;
    private List<String> workshopRequirements;

    private LocalDateTime updatedDate;
    private LocalDateTime creationDate;

    public enum Status {
        ACTIVE,
        INACTIVE
    }

    public enum Type {
        COURSE,
        WORKSHOP
    }

    public enum HeroLayout {
        TWO_COLUMN,
        CENTERED
    }

    @JsonIgnore
    public Map<String, CourseSection> getSectionsAsMapById() {
        return sections.stream().collect(
            Collectors.toMap(
                CourseSection::getId,
                section -> section,
                (duplicateEntryOne, duplicateEntryTwo) -> duplicateEntryOne
            )
        );
    }
}
