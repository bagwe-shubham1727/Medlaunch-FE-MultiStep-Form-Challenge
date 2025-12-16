/**
 * Application constants
 */

// US States for dropdown selections
export const US_STATES = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
];

// Facility Types for Step 2
export const FACILITY_TYPES = [
    "Short-Term Acute Care",
    "Long-Term Acute Care",
    "Critical Access",
    "Children's",
    "Free-Standing Psychiatric",
    "Other",
];

// Service Categories for Step 5
export const SERVICE_CATEGORIES = {
    "Emergency & Critical Care": [
        "Emergency Department",
        "Neonatal Intensive Care Services",
        "Pediatric Intensive Care Services",
    ],
    "Cardiac Services": ["Cardiac Catheterization Laboratory", "Open Heart"],
    "Diagnostic Services": [
        "Magnetic Resonance Imaging (MRI)",
        "Diagnostic Radioisotope Facility",
        "Lithotripsy",
    ],
};

// Service Tab Options for Step 5
export const SERVICE_TABS = [
    "All Services",
    "Clinical",
    "Surgical",
    "Diagnostic",
    "Rehabilitation",
    "Specialty",
];

// Standards Options for Step 5
export const STANDARDS_OPTIONS = [
    { value: "Action1", label: "Action1" },
    { value: "Action2", label: "Action2" },
    { value: "Action3", label: "Action3" },
    { value: "Action4", label: "Action4" },
];

// Form Step Configuration
export const FORM_STEPS = [
    { step: 1, title: "New DNV Quote Request", label: "DNV Quote Request" },
    { step: 2, title: "Facility Details", label: "Facility Details" },
    { step: 3, title: "Leadership Contacts", label: "Leadership Contacts" },
    { step: 4, title: "Site Information", label: "Site Information" },
    { step: 5, title: "Services & Certifications", label: "Services & Certifications" },
    { step: 6, title: "Review & Submit", label: "Review & Submit" },
];

// Validation Patterns
export const VALIDATION_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^[0-9]{10}$/,
    ZIP_CODE: /^\d{5}$/,
    LETTERS_ONLY: /^[A-Za-z\s]+$/,
};

// Date Limits
export const DATE_LIMITS = {
    THROMBOLYTIC_MAX: 25,
    THROMBECTOMY_MAX: 15,
};
