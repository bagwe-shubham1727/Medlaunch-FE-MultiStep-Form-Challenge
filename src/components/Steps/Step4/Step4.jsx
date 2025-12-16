import { useState } from "react";
import { useFormContext } from "/src/contexts/FormContext.jsx";
import Navigation from "../../common/Navigation/Navigation";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./Step4.module.css";

const Step4 = () => {
  const { formData, updateFormData, nextStep, previousStep } = useFormContext();
  const [error, setError] = useState("");

  const handleLocationSelect = (locationType) => {
    updateFormData({ locationType });
    setError(""); // Clear error when selection is made
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + "MB",
    }));
    updateFormData({
      uploadedFiles: [...(formData.uploadedFiles || []), ...newFiles],
    });
    setError(""); // Clear error when file is uploaded
  };

  const handleFileRemove = (fileId) => {
    const newFiles = formData.uploadedFiles.filter((f) => f.id !== fileId);
    updateFormData({ uploadedFiles: newFiles });
  };

  const handleSave = () => {
    alert("Progress saved!");
  };

  const handleContinue = () => {
    // Validate that a location type is selected
    if (!formData.locationType) {
      setError("Please select a location type to continue.");
      return;
    }

    // If multiple locations, validate that at least one file is uploaded
    if (
      formData.locationType === "multiple" &&
      (!formData.uploadedFiles || formData.uploadedFiles.length === 0)
    ) {
      setError("Please upload at least one file to continue.");
      return;
    }

    setError("");
    nextStep();
  };

  return (
    <div className={styles.step}>
      <div className={styles.container}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Do you have multiple sites or locations?
          </h3>

          <div className={styles.locationOptions}>
            <div
              className={`${styles.locationCard} ${
                formData.locationType === "single" ? styles.selected : ""
              }`}
              onClick={() => handleLocationSelect("single")}
            >
              <h4 className={styles.cardTitle}>Single Location</h4>
              <p className={styles.cardDescription}>
                We operate from one facility only
              </p>
            </div>

            <div
              className={`${styles.locationCard} ${
                formData.locationType === "multiple" ? styles.selected : ""
              }`}
              onClick={() => handleLocationSelect("multiple")}
            >
              <h4 className={styles.cardTitle}>Multiple Locations</h4>
              <p className={styles.cardDescription}>
                We have multiple facilities or practice locations
              </p>
            </div>
          </div>

          {formData.locationType === "multiple" && (
            <>
              <div className={styles.sectionGap}></div>
              <div className={styles.uploadSection}>
                <h3 className={styles.sectionTitle}>
                  How would you like to add your site information?
                </h3>

                <div className={styles.uploadCard}>
                  <h4 className={styles.uploadTitle}>Upload CSV / Excel</h4>
                  <p className={styles.uploadDescription}>
                    Upload a spreadsheet with all site information
                  </p>
                </div>

                <div className={styles.dropZoneCard}>
                  <div className={styles.dropZone}>
                    <CloudUploadOutlinedIcon className={styles.uploadIcon} />
                    <p className={styles.dropText}>Upload Site Information</p>
                    <p className={styles.dropSubtext}>
                      Drag and drop your CSV or Excel file here, or click to
                      select
                    </p>

                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className={styles.fileInput}
                      id="fileUpload"
                      multiple
                    />
                    <label htmlFor="fileUpload" className={styles.selectButton}>
                      Select file
                    </label>

                    <button
                      type="button"
                      className={styles.templateLink}
                      onClick={() => alert("Download CSV Template")}
                    >
                      Download CSV Template
                    </button>
                  </div>

                  {(formData.uploadedFiles || []).length > 0 && (
                    <div className={styles.uploadedSection}>
                      <h4 className={styles.uploadedTitle}>Uploaded</h4>
                      {formData.uploadedFiles.map((file) => (
                        <div key={file.id} className={styles.fileItem}>
                          <div className={styles.fileInfo}>
                            <DescriptionOutlinedIcon
                              className={styles.fileIcon}
                            />
                            <span className={styles.fileName}>{file.name}</span>
                            <span>•</span>
                            <button
                              type="button"
                              className={styles.previewLink}
                              onClick={() => alert("File Preview")}
                            >
                              Preview
                            </button>
                          </div>
                          <div className={styles.fileActions}>
                            <span className={styles.fileSize}>{file.size}</span>
                            <button
                              type="button"
                              className={styles.removeButton}
                              onClick={() => handleFileRemove(file.id)}
                            >
                              <CancelIcon />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {error && <p className={styles.errorText}>{error}</p>}
        </section>

        <Navigation
          showPrevious={true}
          buttonText="Continue"
          onPrevious={previousStep}
          onSave={handleSave}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};

export default Step4;
