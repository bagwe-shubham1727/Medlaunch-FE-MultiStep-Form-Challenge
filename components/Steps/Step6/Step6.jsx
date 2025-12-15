import { useState } from "react";
import { useFormContext } from "/src/contexts/FormContext.jsx";
import Navigation from "../../common/Navigation/Navigation";
import styles from "./Step6.module.css";

const Step6 = () => {
  const { formData, previousStep, goToStep } = useFormContext();
  const [certificationChecked, setCertificationChecked] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    basicInfo: false,
    facilityDetails: false,
    leadershipContacts: false,
    siteInformation: false,
    servicesCertifications: false,
  });

  const toggleSection = (sectionKey) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleSubmit = () => {
    if (!certificationChecked) {
      alert("Please certify the information before submitting.");
      return;
    }

    // Log the complete form data to console as required
    console.log("=== FORM SUBMISSION PAYLOAD ===");
    console.log(JSON.stringify(formData, null, 2));
    console.log("================================");

    alert("Application submitted successfully! Check console for payload.");
  };

  return (
    <div className={styles.step}>
      <div className={styles.container}>
        <div className={styles.reviewContainer}>
          <h3 className={styles.mainTitle}>Hospital Information</h3>

          {/* Basic Information Section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection("basicInfo")}
            >
              <span className={styles.collapseIcon}>
                {collapsedSections.basicInfo ? "▼" : "▲"}
              </span>
              <h4 className={styles.sectionTitle}>Basic Information</h4>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.stopPropagation();
                  goToStep(1);
                }}
              >
                Edit
              </button>
            </div>
            {!collapsedSections.basicInfo && (
              <div className={styles.sectionContent}>
                <div className={styles.infoTable}>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Legal Entity Name</div>
                    <div className={styles.value}>
                      {formData.legalEntityName || "Not provided"}
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>d/b/a Name</div>
                    <div className={styles.value}>
                      {formData.doingBusinessAs || "Not provided"}
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Primary Contact</div>
                    <div className={styles.value}>
                      <div className={styles.contactBlock}>
                        <div className={styles.contactName}>
                          {formData.firstName} {formData.lastName}
                        </div>
                        <div className={styles.contactTitle}>
                          {formData.title}
                        </div>
                        <div className={styles.contactInfo}>
                          Work: {formData.workPhone} | Cell:{" "}
                          {formData.cellPhone || "N/A"}
                        </div>
                        <div className={styles.contactInfo}>
                          Email: {formData.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Facility Details Section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection("facilityDetails")}
            >
              <span className={styles.collapseIcon}>
                {collapsedSections.facilityDetails ? "▼" : "▲"}
              </span>
              <h4 className={styles.sectionTitle}>Facility Details</h4>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.stopPropagation();
                  goToStep(2);
                }}
              >
                Edit
              </button>
            </div>
            {!collapsedSections.facilityDetails && (
              <div className={styles.sectionContent}>
                <div className={styles.infoTable}>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Facility Type</div>
                    <div className={styles.value}>
                      {formData.facilityType || "Not selected"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Leadership Contacts Section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection("leadershipContacts")}
            >
              <span className={styles.collapseIcon}>
                {collapsedSections.leadershipContacts ? "▼" : "▲"}
              </span>
              <h4 className={styles.sectionTitle}>Leadership Contacts</h4>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.stopPropagation();
                  goToStep(3);
                }}
              >
                Edit
              </button>
            </div>
            {!collapsedSections.leadershipContacts && (
              <div className={styles.sectionContent}>
                <div className={styles.infoTable}>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>CEO</div>
                    <div className={styles.value}>
                      <div className={styles.contactBlock}>
                        <div className={styles.contactName}>
                          {formData.ceoFirstName}{" "}
                          {formData.ceoLastName || "Not provided"}
                        </div>
                        <div className={styles.contactInfo}>
                          Phone: {formData.ceoPhone || "Not provided"}
                        </div>
                        <div className={styles.contactInfo}>
                          Email: {formData.ceoEmail || "Not provided"}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Add similar blocks for Quality and Invoicing contacts */}
                </div>
              </div>
            )}
          </div>

          {/* Site Information & Services sections - similar pattern */}

          {/* Ready to Submit Section */}
          <div className={styles.submitSection}>
            <h3 className={styles.submitTitle}>Ready to Submit?</h3>

            <div className={styles.certificationCheck}>
              <input
                type="checkbox"
                id="certification"
                checked={certificationChecked}
                onChange={(e) => setCertificationChecked(e.target.checked)}
              />
              <label htmlFor="certification">
                I certify that all information provided is accurate and complete
                to the best of my knowledge
              </label>
            </div>

            <p className={styles.disclaimer}>
              By submitting this form, you agree to our terms and conditions.
              DNV will review your application and contact you within 2-3
              business days.
            </p>

            <div className={styles.exportButtons}>
              <button className={styles.exportButton}>Download as PDF</button>
              <button className={styles.exportButton}>Export to CSV</button>
            </div>
          </div>
        </div>

        <Navigation
          showPrevious={true}
          buttonText="Submit Application"
          onPrevious={previousStep}
          onSave={() => alert("Progress saved!")}
          onContinue={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Step6;
