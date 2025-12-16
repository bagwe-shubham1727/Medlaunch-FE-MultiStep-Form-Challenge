import { createContext, useContext, useState } from "react";

const FormContext = createContext();

const initialFormData = {
  // Step 1: Organization & Primary Contact
  legalEntityName: "",
  doingBusinessAs: "",
  sameAsLegalEntity: false,
  firstName: "",
  lastName: "",
  title: "",
  workPhone: "",
  cellPhone: "",
  email: "",
  emailVerified: false,

  // Step 2: Facility Type
  facilityType: "",

  // Step 3: Leadership Contacts
  ceoFirstName: "",
  ceoLastName: "",
  ceoPhone: "",
  ceoEmail: "",
  ceoSameAsPrimary: false,

  qualityFirstName: "",
  qualityLastName: "",
  qualityPhone: "",
  qualityEmail: "",
  qualitySameAsPrimary: false,

  invoicingFirstName: "",
  invoicingLastName: "",
  invoicingPhone: "",
  invoicingEmail: "",
  invoicingSameAsPrimary: false,

  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",

  // Step 4: Site Information
  locationType: "",
  uploadedFiles: [],

  // Step 5: Services & Certifications
  servicesData: {},
  selectedStandards: [],
  applicationDate: "",
  strokeCertificationExpiry: "",
  thrombolyticDates: [],
  thrombectomyDates: [],
};

export function FormProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 6) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  // Determines which Step 2 variant to show
  const showAlternateStep2 = () => {
    return formData.sameAsLegalEntity === true;
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        updateFormData,
        nextStep,
        previousStep,
        goToStep,
        resetForm,
        showAlternateStep2,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
}
