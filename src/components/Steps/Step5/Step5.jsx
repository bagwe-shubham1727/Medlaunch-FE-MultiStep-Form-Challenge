import { useState } from "react";
import { useFormContext } from "/src/contexts/FormContext.jsx";
import Navigation from "../../common/Navigation/Navigation";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  SERVICE_CATEGORIES,
  SERVICE_TABS,
  STANDARDS_OPTIONS,
  DATE_LIMITS,
  formatDateToUS,
} from "/src/constants";
import styles from "./Step5.module.css";

const Step5 = () => {
  const { formData, updateFormData, nextStep, previousStep } = useFormContext();
  const [activeTab, setActiveTab] = useState("All Services");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOtherService, setShowOtherService] = useState(false);
  const [strokeCertError, setStrokeCertError] = useState("");
  const [thrombolyticError, setThrombolyticError] = useState("");
  const [thrombectomyError, setThrombectomyError] = useState("");

  // Get tomorrow's date as minimum for stroke certification expiry
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Get today's date as maximum for thrombolytic and thrombectomy dates
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const handleStrokeCertificationChange = (value) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(value);

    if (selectedDate <= today) {
      setStrokeCertError("Expiration date must be greater than today's date");
    } else {
      setStrokeCertError("");
    }
    updateFormData({ strokeCertificationExpiry: value });
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
    const maxDates =
      dateType === "thrombolyticDates"
        ? DATE_LIMITS.THROMBOLYTIC_MAX
        : DATE_LIMITS.THROMBECTOMY_MAX;

    // Validate that date is not in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);

    if (selectedDate > today) {
      if (dateType === "thrombolyticDates") {
        setThrombolyticError("Date cannot be greater than today's date");
      } else {
        setThrombectomyError("Date cannot be greater than today's date");
      }
      return;
    }

    // Clear error if valid
    if (dateType === "thrombolyticDates") {
      setThrombolyticError("");
    } else {
      setThrombectomyError("");
    }

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
  const filteredCategories = Object.entries(SERVICE_CATEGORIES).reduce(
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
          <div
            className={styles.serviceTabs}
            role="tablist"
            aria-label="Service categories"
          >
            {SERVICE_TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
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
              aria-label="Search services"
            />
            <SearchIcon className={styles.searchIcon} aria-hidden="true" />
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
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {/* Add Other Service */}
          <button
            type="button"
            className={styles.addServiceButton}
            onClick={() => setShowOtherService(true)}
          >
            + Add Other Service
          </button>
          {/* Other Service Input */}
          {showOtherService && (
            <div className={styles.otherServiceSection}>
              <h4 className={styles.categoryTitle}>Other Service</h4>
              <div className={styles.otherServiceInput}>
                <input
                  type="text"
                  placeholder="Specify other service"
                  className={styles.input}
                  value={formData.otherServiceValue || ""}
                  onChange={(e) =>
                    updateFormData({ otherServiceValue: e.target.value })
                  }
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => {
                    setShowOtherService(false);
                    updateFormData({ otherServiceValue: "" });
                  }}
                >
                  ❌
                </button>
              </div>
            </div>
          )}
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
              {STANDARDS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {(formData.selectedStandards || []).length > 0 && (
              <div
                className={styles.tagContainer}
                role="list"
                aria-label="Selected standards"
              >
                {formData.selectedStandards.map((standard, index) => (
                  <div
                    key={index}
                    className={styles.standardTag}
                    role="listitem"
                  >
                    <span>{standard}</span>
                    <button
                      type="button"
                      className={styles.standardTagRemove}
                      onClick={() => handleStandardRemove(index)}
                      aria-label={`Remove ${standard}`}
                    >
                      <ClearIcon aria-hidden="true" />
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
                className={`${styles.input} ${
                  strokeCertError ? styles.inputError : ""
                }`}
                min={getTomorrowDate()}
                value={formData.strokeCertificationExpiry || ""}
                onChange={(e) =>
                  handleStrokeCertificationChange(e.target.value)
                }
              />
              {strokeCertError && (
                <span className={styles.errorText}>{strokeCertError}</span>
              )}
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
              className={`${styles.input} ${
                thrombolyticError ? styles.inputError : ""
              }`}
              max={getTodayDate()}
              onChange={(e) => {
                handleDateAdd("thrombolyticDates", e.target.value);
                e.target.value = "";
              }}
            />
            {thrombolyticError && (
              <span className={styles.errorText}>{thrombolyticError}</span>
            )}

            {(formData.thrombolyticDates || []).length > 0 && (
              <div
                className={styles.tagContainer}
                role="list"
                aria-label="Selected thrombolytic dates"
              >
                {formData.thrombolyticDates.map((date, index) => (
                  <div key={index} className={styles.tag} role="listitem">
                    <span>{formatDateToUS(date)}</span>
                    <button
                      type="button"
                      className={styles.tagRemove}
                      onClick={() =>
                        handleDateRemove("thrombolyticDates", index)
                      }
                      aria-label={`Remove date ${formatDateToUS(date)}`}
                    >
                      <CancelIcon aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className={styles.helperText}>
              Selected: {(formData.thrombolyticDates || []).length}/
              {DATE_LIMITS.THROMBOLYTIC_MAX}
            </p>
          </div>
          {/* Thrombectomy Dates - Similar structure */}}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Dates of last fifteen thrombectomies
            </label>
            <input
              type="date"
              className={`${styles.input} ${
                thrombectomyError ? styles.inputError : ""
              }`}
              max={getTodayDate()}
              onChange={(e) => {
                handleDateAdd("thrombectomyDates", e.target.value);
                e.target.value = "";
              }}
            />
            {thrombectomyError && (
              <span className={styles.errorText}>{thrombectomyError}</span>
            )}

            {(formData.thrombectomyDates || []).length > 0 && (
              <div
                className={styles.tagContainer}
                role="list"
                aria-label="Selected thrombectomy dates"
              >
                {formData.thrombectomyDates.map((date, index) => (
                  <div key={index} className={styles.tag} role="listitem">
                    <span>{formatDateToUS(date)}</span>
                    <button
                      type="button"
                      className={styles.tagRemove}
                      onClick={() =>
                        handleDateRemove("thrombectomyDates", index)
                      }
                      aria-label={`Remove date ${formatDateToUS(date)}`}
                    >
                      <CancelIcon aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className={styles.helperText}>
              Selected: {(formData.thrombectomyDates || []).length}/
              {DATE_LIMITS.THROMBECTOMY_MAX}
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
