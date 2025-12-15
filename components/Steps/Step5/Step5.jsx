import { useState } from "react";
import { useFormContext } from "/src/contexts/FormContext.jsx";
import Navigation from "../../common/Navigation/Navigation";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Step5.module.css";

const Step5 = () => {
  const { formData, updateFormData, nextStep, previousStep } = useFormContext();
  const [activeTab, setActiveTab] = useState("All Services");
  const [searchTerm, setSearchTerm] = useState("");

  const serviceCategories = {
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

  const handleServiceChange = (service, checked) => {
    const currentServices = formData.servicesData || {};
    if (checked) {
      updateFormData({
        servicesData: {
          ...currentServices,
          [service]: {
            selected: true,
            contact: { name: "", phone: "", email: "" },
          },
        },
      });
    } else {
      const newServices = { ...currentServices };
      delete newServices[service];
      updateFormData({ servicesData: newServices });
    }
  };

  const handleContactChange = (service, field, value) => {
    const currentServices = formData.servicesData || {};
    updateFormData({
      servicesData: {
        ...currentServices,
        [service]: {
          ...currentServices[service],
          contact: {
            ...currentServices[service]?.contact,
            [field]: value,
          },
        },
      },
    });
  };

  const handleStandardSelect = (standard) => {
    if (standard && !(formData.selectedStandards || []).includes(standard)) {
      updateFormData({
        selectedStandards: [...(formData.selectedStandards || []), standard],
      });
    }
  };

  const handleStandardRemove = (index) => {
    updateFormData({
      selectedStandards: formData.selectedStandards.filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleDateAdd = (dateType, date) => {
    const currentDates = formData[dateType] || [];
    const maxDates = dateType === "thrombolyticDates" ? 25 : 15;

    if (
      date &&
      currentDates.length < maxDates &&
      !currentDates.includes(date)
    ) {
      updateFormData({
        [dateType]: [...currentDates, date],
      });
    }
  };

  const handleDateRemove = (dateType, index) => {
    updateFormData({
      [dateType]: formData[dateType].filter((_, i) => i !== index),
    });
  };

  // Filter services based on search term
  const filteredCategories = Object.entries(serviceCategories).reduce(
    (acc, [category, services]) => {
      const filtered = services.filter((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {}
  );

  return (
    <div className={styles.step}>
      <div className={styles.container}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Service Offering</h3>
          <p className={styles.sectionSubtitle}>
            Primary Site Service offering
          </p>

          {/* Service Tabs */}
          <div className={styles.serviceTabs}>
            {[
              "All Services",
              "Clinical",
              "Surgical",
              "Diagnostic",
              "Rehabilitation",
              "Specialty",
            ].map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search services..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className={styles.searchIcon} />
          </div>

          {/* Service Categories */}
          <div className={styles.serviceGrid}>
            {Object.entries(filteredCategories).map(([category, services]) => (
              <div key={category} className={styles.serviceCategory}>
                <h4 className={styles.categoryTitle}>{category}</h4>

                {services.map((service, index) => {
                  const isSelected =
                    formData.servicesData?.[service]?.selected || false;

                  return (
                    <div key={index} className={styles.serviceBlock}>
                      <div className={styles.serviceOption}>
                        <input
                          type="checkbox"
                          id={`service-${category}-${index}`}
                          checked={isSelected}
                          onChange={(e) =>
                            handleServiceChange(service, e.target.checked)
                          }
                        />
                        <label htmlFor={`service-${category}-${index}`}>
                          {service}
                        </label>
                      </div>

                      {isSelected && (
                        <div className={styles.contactForm}>
                          <div className={styles.contactRow}>
                            <div className={styles.contactField}>
                              <label className={styles.contactLabel}>
                                Contact Name:
                              </label>
                              <input
                                type="text"
                                className={styles.contactInput}
                                value={
                                  formData.servicesData?.[service]?.contact
                                    ?.name || ""
                                }
                                onChange={(e) =>
                                  handleContactChange(
                                    service,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter contact name"
                              />
                            </div>
                          </div>
                          <div className={styles.contactRow}>
                            <div className={styles.contactField}>
                              <label className={styles.contactLabel}>
                                Phone:
                              </label>
                              <input
                                type="tel"
                                className={styles.contactInput}
                                value={
                                  formData.servicesData?.[service]?.contact
                                    ?.phone || ""
                                }
                                onChange={(e) =>
                                  handleContactChange(
                                    service,
                                    "phone",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter phone number"
                              />
                            </div>
                            <div className={styles.contactField}>
                              <label className={styles.contactLabel}>
                                Email:
                              </label>
                              <input
                                type="email"
                                className={styles.contactInput}
                                value={
                                  formData.servicesData?.[service]?.contact
                                    ?.email || ""
                                }
                                onChange={(e) =>
                                  handleContactChange(
                                    service,
                                    "email",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter email address"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Standards Dropdown */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Standards to Apply</label>
            <select
              className={styles.select}
              onChange={(e) => {
                handleStandardSelect(e.target.value);
                e.target.value = "";
              }}
            >
              <option value="">Select Standard(s)</option>
              <option value="Standard 1">Standard 1</option>
              <option value="Standard 2">Standard 2</option>
              <option value="Standard 3">Standard 3</option>
              <option value="Standard 4">Standard 4</option>
            </select>

            {(formData.selectedStandards || []).length > 0 && (
              <div className={styles.tagContainer}>
                {formData.selectedStandards.map((standard, index) => (
                  <div key={index} className={styles.standardTag}>
                    <span>{standard}</span>
                    <button
                      type="button"
                      className={styles.standardTagRemove}
                      onClick={() => handleStandardRemove(index)}
                    >
                      <ClearIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date Fields */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Expiration Date of Current Stroke Certification
              </label>
              <input
                type="date"
                className={styles.input}
                value={formData.strokeCertificationExpiry || ""}
                onChange={(e) =>
                  updateFormData({ strokeCertificationExpiry: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Date of Application</label>
              <input
                type="date"
                className={styles.input}
                value={formData.applicationDate || ""}
                onChange={(e) =>
                  updateFormData({ applicationDate: e.target.value })
                }
              />
            </div>
          </div>

          {/* Thrombolytic Dates */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Dates of last twenty-five thrombolytic administrations
            </label>
            <input
              type="date"
              className={styles.input}
              onChange={(e) => {
                handleDateAdd("thrombolyticDates", e.target.value);
                e.target.value = "";
              }}
            />

            {(formData.thrombolyticDates || []).length > 0 && (
              <div className={styles.tagContainer}>
                {formData.thrombolyticDates.map((date, index) => (
                  <div key={index} className={styles.tag}>
                    <span>{date}</span>
                    <button
                      type="button"
                      className={styles.tagRemove}
                      onClick={() =>
                        handleDateRemove("thrombolyticDates", index)
                      }
                    >
                      <CancelIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className={styles.helperText}>
              Selected: {(formData.thrombolyticDates || []).length}/25
            </p>
          </div>

          {/* Thrombectomy Dates - Similar structure */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Dates of last fifteen thrombectomies
            </label>
            <input
              type="date"
              className={styles.input}
              onChange={(e) => {
                handleDateAdd("thrombectomyDates", e.target.value);
                e.target.value = "";
              }}
            />

            {(formData.thrombectomyDates || []).length > 0 && (
              <div className={styles.tagContainer}>
                {formData.thrombectomyDates.map((date, index) => (
                  <div key={index} className={styles.tag}>
                    <span>{date}</span>
                    <button
                      type="button"
                      className={styles.tagRemove}
                      onClick={() =>
                        handleDateRemove("thrombectomyDates", index)
                      }
                    >
                      <CancelIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className={styles.helperText}>
              Selected: {(formData.thrombectomyDates || []).length}/15
            </p>
          </div>
        </section>

        <Navigation
          showPrevious={true}
          buttonText="Continue"
          onPrevious={previousStep}
          onSave={() => alert("Progress saved!")}
          onContinue={nextStep}
        />
      </div>
    </div>
  );
};

export default Step5;
