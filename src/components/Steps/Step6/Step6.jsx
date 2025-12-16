import { useState } from "react";
import { useFormContext } from "/src/contexts/FormContext.jsx";
import Navigation from "../../common/Navigation/Navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { jsPDF } from "jspdf";
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
    // Log the complete form data to console as required
    console.log("=== FORM SUBMISSION PAYLOAD ===");
    console.log(JSON.stringify(formData, null, 2));
    console.log("================================");

    alert("Application submitted successfully! Check console for payload.");
  };

  // Helper function to format phone number
  const formatPhone = (phone) => {
    if (!phone || phone.length !== 10) return phone || "Not Provided";
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  };

  // Export to CSV functionality
  const handleExportCSV = () => {
    const csvData = [];

    // Basic Information
    csvData.push(["Section", "Field", "Value"]);
    csvData.push([
      "Basic Information",
      "Legal Entity Name",
      formData.legalEntityName || "Not Provided",
    ]);
    csvData.push([
      "Basic Information",
      "d/b/a Name",
      formData.doingBusinessAs || "Not Provided",
    ]);
    csvData.push([
      "Basic Information",
      "Primary Contact Name",
      `${formData.firstName || ""} ${formData.lastName || ""}`,
    ]);
    csvData.push([
      "Basic Information",
      "Primary Contact Title",
      formData.title || "Not Provided",
    ]);
    csvData.push([
      "Basic Information",
      "Work Phone",
      formData.workPhone || "Not Provided",
    ]);
    csvData.push([
      "Basic Information",
      "Cell Phone",
      formData.cellPhone || "Not Provided",
    ]);
    csvData.push([
      "Basic Information",
      "Email",
      formData.email || "Not Provided",
    ]);
    csvData.push([
      "Basic Information",
      "Email Verified",
      formData.emailVerified ? "Yes" : "No",
    ]);

    // Facility Details
    csvData.push([
      "Facility Details",
      "Facility Type",
      formData.facilityType || "Not Selected",
    ]);

    // Leadership Contacts - CEO
    csvData.push([
      "Leadership Contacts",
      "CEO Name",
      `${formData.ceoFirstName || ""} ${formData.ceoLastName || ""}`,
    ]);
    csvData.push([
      "Leadership Contacts",
      "CEO Phone",
      formData.ceoPhone || "Not Provided",
    ]);
    csvData.push([
      "Leadership Contacts",
      "CEO Email",
      formData.ceoEmail || "Not Provided",
    ]);

    // Leadership Contacts - Director of Quality
    csvData.push([
      "Leadership Contacts",
      "Director of Quality Name",
      `${formData.qualityFirstName || ""} ${formData.qualityLastName || ""}`,
    ]);
    csvData.push([
      "Leadership Contacts",
      "Director of Quality Phone",
      formData.qualityPhone || "Not Provided",
    ]);
    csvData.push([
      "Leadership Contacts",
      "Director of Quality Email",
      formData.qualityEmail || "Not Provided",
    ]);

    // Leadership Contacts - Invoicing Contact
    csvData.push([
      "Leadership Contacts",
      "Invoicing Contact Name",
      `${formData.invoicingFirstName || ""} ${
        formData.invoicingLastName || ""
      }`,
    ]);
    csvData.push([
      "Leadership Contacts",
      "Invoicing Contact Phone",
      formData.invoicingPhone || "Not Provided",
    ]);
    csvData.push([
      "Leadership Contacts",
      "Invoicing Contact Email",
      formData.invoicingEmail || "Not Provided",
    ]);
    csvData.push([
      "Leadership Contacts",
      "Billing Address",
      `${formData.streetAddress || ""}, ${formData.city || ""}, ${
        formData.state || ""
      } ${formData.zipCode || ""}`,
    ]);

    // Site Information
    csvData.push([
      "Site Information",
      "Site Configuration",
      formData.locationType === "single"
        ? "Single Location"
        : formData.locationType === "multiple"
        ? "Multiple Locations"
        : "Not Selected",
    ]);
    csvData.push([
      "Site Information",
      "Uploaded Files",
      formData.uploadedFiles?.length > 0
        ? formData.uploadedFiles.map((f) => f.name || f).join("; ")
        : "No files uploaded",
    ]);

    // Services & Certifications
    const selectedServices = formData.servicesData
      ? Object.keys(formData.servicesData).filter(
          (key) => formData.servicesData[key]
        )
      : [];
    csvData.push([
      "Services & Certifications",
      "Services Provided",
      selectedServices.length > 0
        ? selectedServices.join("; ")
        : "No services selected",
    ]);
    csvData.push([
      "Services & Certifications",
      "Standards to Apply",
      formData.selectedStandards?.length > 0
        ? formData.selectedStandards.join("; ")
        : "No standards selected",
    ]);
    csvData.push([
      "Services & Certifications",
      "Date of Application",
      formData.applicationDate || "Not Provided",
    ]);
    csvData.push([
      "Services & Certifications",
      "Stroke Certification Expiry",
      formData.strokeCertificationExpiry || "Not Provided",
    ]);

    if (formData.thrombolyticDates?.length > 0) {
      csvData.push([
        "Services & Certifications",
        "Thrombolytic Dates",
        formData.thrombolyticDates.join("; "),
      ]);
    }
    if (formData.thrombectomyDates?.length > 0) {
      csvData.push([
        "Services & Certifications",
        "Thrombectomy Dates",
        formData.thrombectomyDates.join("; "),
      ]);
    }

    // Convert to CSV string
    const csvContent = csvData
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `hospital_application_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download as PDF functionality
  const handleDownloadPDF = () => {
    const selectedServices = formData.servicesData
      ? Object.keys(formData.servicesData).filter(
          (key) => formData.servicesData[key]
        )
      : [];

    const doc = new jsPDF();
    let yPos = 20;
    const lineHeight = 7;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    // Helper function to add text and handle page breaks
    const addText = (text, x, fontSize = 10, isBold = false) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.text(text, x, yPos);
      yPos += lineHeight;
    };

    const addSection = (title) => {
      yPos += 5;
      doc.setDrawColor(0, 82, 165);
      doc.setFillColor(0, 82, 165);
      doc.rect(margin, yPos - 5, maxWidth, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin + 3, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 10;
    };

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 82, 165);
    doc.text("Hospital Application Form", margin, yPos);
    yPos += 10;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPos);
    doc.setTextColor(0, 0, 0);
    yPos += 15;

    // Basic Information
    addSection("Basic Information");
    addText(
      `Legal Entity Name: ${formData.legalEntityName || "Not Provided"}`,
      margin
    );
    addText(
      `d/b/a Name: ${formData.doingBusinessAs || "Not Provided"}`,
      margin
    );
    yPos += 3;
    addText("Primary Contact:", margin, 10, true);
    addText(
      `  Name: ${formData.firstName || ""} ${formData.lastName || ""}`,
      margin
    );
    addText(`  Title: ${formData.title || "Not Provided"}`, margin);
    addText(`  Work Phone: ${formatPhone(formData.workPhone)}`, margin);
    addText(`  Cell Phone: ${formatPhone(formData.cellPhone)}`, margin);
    addText(
      `  Email: ${formData.email || "Not Provided"} (${
        formData.emailVerified ? "Verified" : "Not Verified"
      })`,
      margin
    );

    // Facility Details
    addSection("Facility Details");
    addText(
      `Facility Type: ${formData.facilityType || "Not Selected"}`,
      margin
    );

    // Leadership Contacts
    addSection("Leadership Contacts");
    addText("CEO:", margin, 10, true);
    addText(
      `  Name: ${formData.ceoFirstName || ""} ${
        formData.ceoLastName || "Not Provided"
      }`,
      margin
    );
    addText(`  Phone: ${formatPhone(formData.ceoPhone)}`, margin);
    addText(`  Email: ${formData.ceoEmail || "Not Provided"}`, margin);
    yPos += 3;
    addText("Director of Quality:", margin, 10, true);
    addText(
      `  Name: ${formData.qualityFirstName || ""} ${
        formData.qualityLastName || "Not Provided"
      }`,
      margin
    );
    addText(`  Phone: ${formatPhone(formData.qualityPhone)}`, margin);
    addText(`  Email: ${formData.qualityEmail || "Not Provided"}`, margin);
    yPos += 3;
    addText("Invoicing Contact:", margin, 10, true);
    addText(
      `  Name: ${formData.invoicingFirstName || ""} ${
        formData.invoicingLastName || "Not Provided"
      }`,
      margin
    );
    addText(`  Phone: ${formatPhone(formData.invoicingPhone)}`, margin);
    addText(`  Email: ${formData.invoicingEmail || "Not Provided"}`, margin);
    addText(
      `  Billing Address: ${formData.streetAddress || "Not Provided"}, ${
        formData.city || ""
      }, ${formData.state || ""} ${formData.zipCode || ""}`,
      margin
    );

    // Site Information
    addSection("Site Information");
    addText(
      `Site Configuration: ${
        formData.locationType === "single"
          ? "Single Location"
          : formData.locationType === "multiple"
          ? "Multiple Locations"
          : "Not Selected"
      }`,
      margin
    );
    addText(
      `Uploaded Files: ${
        formData.uploadedFiles?.length > 0
          ? formData.uploadedFiles.map((f) => f.name || f).join(", ")
          : "No files uploaded"
      }`,
      margin
    );

    // Services & Certifications
    addSection("Services & Certifications");
    addText(
      `Services Provided: ${
        selectedServices.length > 0
          ? selectedServices.join(", ")
          : "No services selected"
      }`,
      margin
    );
    addText(
      `Standards to Apply: ${
        formData.selectedStandards?.length > 0
          ? formData.selectedStandards.join(", ")
          : "No standards selected"
      }`,
      margin
    );
    addText(
      `Date of Application: ${formData.applicationDate || "Not Provided"}`,
      margin
    );
    addText(
      `Stroke Certification Expiry: ${
        formData.strokeCertificationExpiry || "Not Provided"
      }`,
      margin
    );

    if (formData.thrombolyticDates?.length > 0) {
      addText(
        `Thrombolytic Dates: ${formData.thrombolyticDates.join(", ")}`,
        margin
      );
    }
    if (formData.thrombectomyDates?.length > 0) {
      addText(
        `Thrombectomy Dates: ${formData.thrombectomyDates.join(", ")}`,
        margin
      );
    }

    // Save the PDF
    doc.save(
      `hospital_application_${new Date().toISOString().split("T")[0]}.pdf`
    );
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
                {collapsedSections.basicInfo ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
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
                      {formData.legalEntityName || "Not Provided"}
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>d/b/a Name</div>
                    <div className={styles.value}>
                      {formData.doingBusinessAs || "Not Provided"}
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
                          Work: {formData.workPhone || "Not Provided"} | Cell:{" "}
                          {formData.cellPhone || "Not Provided"}
                        </div>
                        <div className={styles.contactInfo}>
                          Email: {formData.email}
                          <span
                            className={
                              formData.emailVerified
                                ? styles.verified
                                : styles.notVerified
                            }
                          >
                            {formData.emailVerified
                              ? "Verified"
                              : "Not verified"}
                          </span>
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
                {collapsedSections.facilityDetails ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
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
                {collapsedSections.leadershipContacts ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
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
                          {formData.ceoFirstName || ""}{" "}
                          {formData.ceoLastName || ""}
                          {!formData.ceoFirstName &&
                            !formData.ceoLastName &&
                            "Not Provided"}
                        </div>
                        <div className={styles.contactInfo}>
                          Phone: {formData.ceoPhone || "Not Provided"}
                        </div>
                        <div className={styles.contactInfo}>
                          Email: {formData.ceoEmail || "Not Provided"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Director of Quality</div>
                    <div className={styles.value}>
                      <div className={styles.contactBlock}>
                        <div className={styles.contactName}>
                          {formData.qualityFirstName || ""}{" "}
                          {formData.qualityLastName || ""}
                          {!formData.qualityFirstName &&
                            !formData.qualityLastName &&
                            "Not Provided"}
                        </div>
                        <div className={styles.contactInfo}>
                          Phone: {formData.qualityPhone || "Not Provided"}
                        </div>
                        <div className={styles.contactInfo}>
                          Email: {formData.qualityEmail || "Not Provided"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Invoicing Contact</div>
                    <div className={styles.value}>
                      <div className={styles.contactBlock}>
                        <div className={styles.contactName}>
                          {formData.invoicingFirstName || ""}{" "}
                          {formData.invoicingLastName || ""}
                          {!formData.invoicingFirstName &&
                            !formData.invoicingLastName &&
                            "Not Provided"}
                        </div>
                        <div className={styles.contactTitle}>
                          Title: Director of Finance
                        </div>
                        <div className={styles.contactInfo}>
                          Phone: {formData.invoicingPhone || "Not Provided"}
                        </div>
                        <div className={styles.contactInfo}>
                          Email: {formData.invoicingEmail || "Not Provided"}
                        </div>
                        <div className={styles.contactInfo}>
                          Billing Address:{" "}
                          {formData.streetAddress || "Not Provided"},{" "}
                          {formData.city || ""}, {formData.state || ""}{" "}
                          {formData.zipCode || ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Site Information Section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection("siteInformation")}
            >
              <span className={styles.collapseIcon}>
                {collapsedSections.siteInformation ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </span>
              <h4 className={styles.sectionTitle}>Site Information</h4>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.stopPropagation();
                  goToStep(4);
                }}
              >
                Edit
              </button>
            </div>
            {!collapsedSections.siteInformation && (
              <div className={styles.sectionContent}>
                <div className={styles.infoTable}>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Site Configuration</div>
                    <div className={styles.value}>
                      {formData.locationType === "single"
                        ? "Single Location"
                        : formData.locationType === "multiple"
                        ? "Multiple Locations"
                        : "Not Selected"}
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Input Method</div>
                    <div className={styles.value}>
                      {formData.uploadedFiles &&
                      formData.uploadedFiles.length > 0 ? (
                        <div className={styles.locationBlock}>
                          <div className={styles.locationTitle}>
                            File Upload
                          </div>
                          {formData.uploadedFiles.map((file, index) => (
                            <div key={index} className={styles.locationInfo}>
                              {file.name || file}
                            </div>
                          ))}
                        </div>
                      ) : (
                        "No files uploaded"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Services & Certifications Section */}
          <div className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection("servicesCertifications")}
            >
              <span className={styles.collapseIcon}>
                {collapsedSections.servicesCertifications ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowUpIcon />
                )}
              </span>
              <h4 className={styles.sectionTitle}>Services & Certifications</h4>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.stopPropagation();
                  goToStep(5);
                }}
              >
                Edit
              </button>
            </div>
            {!collapsedSections.servicesCertifications && (
              <div className={styles.sectionContent}>
                <div className={styles.infoTable}>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Services Provided</div>
                    <div className={styles.value}>
                      {formData.servicesData &&
                      Object.keys(formData.servicesData).filter(
                        (key) => formData.servicesData[key]
                      ).length > 0 ? (
                        <div className={styles.tagContainer}>
                          {Object.keys(formData.servicesData)
                            .filter((key) => formData.servicesData[key])
                            .map((service, index) => (
                              <span
                                key={index}
                                className={styles.serviceTagOutlined}
                              >
                                {service
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())
                                  .trim()}
                              </span>
                            ))}
                        </div>
                      ) : (
                        <span className={styles.noData}>
                          No services selected
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Standards to Apply</div>
                    <div className={styles.value}>
                      {formData.selectedStandards &&
                      formData.selectedStandards.length > 0 ? (
                        <div className={styles.tagContainer}>
                          {formData.selectedStandards.map((standard, index) => (
                            <span
                              key={index}
                              className={styles.serviceTagOutlined}
                            >
                              {standard}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className={styles.noData}>
                          No standards selected
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>Date of Application</div>
                    <div className={styles.value}>
                      {formData.applicationDate || "Not Provided"}
                    </div>
                  </div>
                  <div className={styles.infoRow}>
                    <div className={styles.label}>
                      Expiration Date of Current Stroke Certification
                    </div>
                    <div className={styles.value}>
                      {formData.strokeCertificationExpiry || "Not Provided"}
                    </div>
                  </div>
                  {formData.thrombolyticDates &&
                    formData.thrombolyticDates.length > 0 && (
                      <div className={styles.infoRow}>
                        <div className={styles.label}>
                          Dates of last twenty-five thrombolytic administrations
                        </div>
                        <div className={styles.value}>
                          <div className={styles.dateList}>
                            {formData.thrombolyticDates.join(", ")}
                          </div>
                        </div>
                      </div>
                    )}
                  {formData.thrombectomyDates &&
                    formData.thrombectomyDates.length > 0 && (
                      <div className={styles.infoRow}>
                        <div className={styles.label}>
                          Dates of last fifteen thrombectomies
                        </div>
                        <div className={styles.value}>
                          <div className={styles.dateList}>
                            {formData.thrombectomyDates.join(", ")}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>

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
              <button
                className={styles.exportButton}
                onClick={handleDownloadPDF}
              >
                Download as PDF
              </button>
              <button className={styles.exportButton} onClick={handleExportCSV}>
                Export to CSV
              </button>
            </div>
          </div>
        </div>

        <Navigation
          showPrevious={true}
          buttonText="Submit Application"
          onPrevious={previousStep}
          onSave={() => alert("Progress saved!")}
          onContinue={handleSubmit}
          disabled={!certificationChecked}
        />
      </div>
    </div>
  );
};

export default Step6;
