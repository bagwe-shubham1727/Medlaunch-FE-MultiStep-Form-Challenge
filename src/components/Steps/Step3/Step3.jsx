import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "/src/contexts/FormContext.jsx";
import Navigation from "../../common/Navigation/Navigation";
import ContactSection from "./ContactSection";
import styles from "./Step3.module.css";

const Step3 = () => {
  const { formData, updateFormData, nextStep, previousStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
    clearErrors,
    trigger,
  } = useForm({
    defaultValues: formData,
    mode: "onChange",
  });

  const ceoSameAsPrimary = watch("ceoSameAsPrimary");
  const qualitySameAsPrimary = watch("qualitySameAsPrimary");
  const invoicingSameAsPrimary = watch("invoicingSameAsPrimary");

  // Sync fields with Primary Contact data when "Same as Primary" is checked
  useEffect(() => {
    const syncWithPrimary = async (prefix, isChecked) => {
      if (isChecked) {
        setValue(`${prefix}FirstName`, formData.firstName);
        setValue(`${prefix}LastName`, formData.lastName);
        setValue(`${prefix}Phone`, formData.workPhone);
        setValue(`${prefix}Email`, formData.email);
        // Validate the populated fields
        await trigger([
          `${prefix}FirstName`,
          `${prefix}LastName`,
          `${prefix}Phone`,
          `${prefix}Email`,
        ]);
      }
    };

    syncWithPrimary("ceo", ceoSameAsPrimary);
    syncWithPrimary("quality", qualitySameAsPrimary);
    syncWithPrimary("invoicing", invoicingSameAsPrimary);
  }, [
    formData.firstName,
    formData.lastName,
    formData.workPhone,
    formData.email,
    ceoSameAsPrimary,
    qualitySameAsPrimary,
    invoicingSameAsPrimary,
    setValue,
    trigger,
  ]);

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  const handleSameAsPrimaryChange = async (prefix, checked) => {
    setValue(`${prefix}SameAsPrimary`, checked);

    if (checked) {
      setValue(`${prefix}FirstName`, formData.firstName);
      setValue(`${prefix}LastName`, formData.lastName);
      setValue(`${prefix}Phone`, formData.workPhone);
      setValue(`${prefix}Email`, formData.email);
      // Validate the populated fields
      await trigger([
        `${prefix}FirstName`,
        `${prefix}LastName`,
        `${prefix}Phone`,
        `${prefix}Email`,
      ]);
    }
  };

  const handleSave = () => {
    const currentValues = getValues();
    updateFormData(currentValues);
    alert("Progress saved!");
  };

  const states = [
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

  // Contact sections configuration - demonstrating reusability
  const contactSections = [
    {
      title: "Chief Executive Officer (CEO)",
      prefix: "ceo",
      sameAsPrimary: ceoSameAsPrimary,
      required: true,
    },
    {
      title: "Director of Quality",
      prefix: "quality",
      sameAsPrimary: qualitySameAsPrimary,
      required: false,
    },
    {
      title: "Invoicing Contact",
      prefix: "invoicing",
      sameAsPrimary: invoicingSameAsPrimary,
      required: true,
    },
  ];

  return (
    <div className={styles.step}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>

            {/* CEO Contact */}
            <ContactSection
              title="Chief Executive Officer (CEO)"
              prefix="ceo"
              register={register}
              errors={errors}
              sameAsPrimary={ceoSameAsPrimary}
              onSameAsPrimaryChange={handleSameAsPrimaryChange}
              required={true}
            />

            {/* Director of Quality */}
            <ContactSection
              title="Director of Quality"
              prefix="quality"
              register={register}
              errors={errors}
              sameAsPrimary={qualitySameAsPrimary}
              onSameAsPrimaryChange={handleSameAsPrimaryChange}
              required={false}
            />

            {/* Invoicing Contact with Billing Address inside */}
            <ContactSection
              title="Invoicing Contact"
              prefix="invoicing"
              register={register}
              errors={errors}
              sameAsPrimary={invoicingSameAsPrimary}
              onSameAsPrimaryChange={handleSameAsPrimaryChange}
              required={true}
            >
              {/* Billing Address - Part of Invoicing Contact */}
              <div className={styles.sectionGap}></div>
              <div className={styles.billingAddressSection}>
                <h5 className={styles.billingTitle}>Billing Address</h5>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Street Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    {...register("streetAddress", {
                      required: "Street Address is required",
                    })}
                    type="text"
                    className={`${styles.input} ${
                      errors.streetAddress ? styles.error : ""
                    }`}
                  />
                  {errors.streetAddress && (
                    <span className={styles.errorText}>
                      {errors.streetAddress.message}
                    </span>
                  )}
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      City <span className={styles.required}>*</span>
                    </label>
                    <input
                      {...register("city", {
                        required: "City is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: "City can only contain letters",
                        },
                      })}
                      type="text"
                      onKeyDown={(e) => {
                        if (/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      className={`${styles.input} ${
                        errors.city ? styles.error : ""
                      }`}
                    />
                    {errors.city && (
                      <span className={styles.errorText}>
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      State <span className={styles.required}>*</span>
                    </label>
                    <select
                      {...register("state", {
                        required: "Please select a state",
                      })}
                      className={`${styles.select} ${
                        errors.state ? styles.error : ""
                      }`}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <span className={styles.errorText}>
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      ZIP Code <span className={styles.required}>*</span>
                    </label>
                    <input
                      {...register("zipCode", {
                        required: "ZIP Code is required",
                        pattern: {
                          value: /^\d{5}$/,
                          message: "ZIP Code must be exactly 5 digits",
                        },
                      })}
                      type="text"
                      minLength={5}
                      maxLength={5}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          ![
                            "Backspace",
                            "Delete",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                      className={`${styles.input} ${
                        errors.zipCode ? styles.error : ""
                      }`}
                    />
                    {errors.zipCode && (
                      <span className={styles.errorText}>
                        {errors.zipCode.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </ContactSection>
          </section>

          <Navigation
            showPrevious={true}
            buttonText="Continue"
            onPrevious={previousStep}
            onSave={handleSave}
            onContinue={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </div>
  );
};

export default Step3;
