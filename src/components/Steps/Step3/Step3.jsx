import { useForm } from "react-hook-form";
import { useFormContext } from "/src/contexts/FormContext.jsx";
import Navigation from "../../common/Navigation/Navigation";
import styles from "./Step3.module.css";

const Step3 = () => {
  const { formData, updateFormData, nextStep, previousStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: formData,
  });

  const ceoSameAsPrimary = watch("ceoSameAsPrimary");
  const qualitySameAsPrimary = watch("qualitySameAsPrimary");
  const invoicingSameAsPrimary = watch("invoicingSameAsPrimary");

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  const handleSameAsPrimaryChange = (prefix, checked) => {
    setValue(`${prefix}SameAsPrimary`, checked);

    if (checked) {
      setValue(`${prefix}FirstName`, formData.firstName);
      setValue(`${prefix}LastName`, formData.lastName);
      setValue(`${prefix}Phone`, formData.workPhone);
      setValue(`${prefix}Email`, formData.email);
    }
  };

  const handleSave = () => {
    const currentValues = watch();
    updateFormData(currentValues);
    alert("Progress saved!");
  };

  const states = [
    { value: "AL", label: "Alabama" },
    { value: "CA", label: "California" },
    { value: "FL", label: "Florida" },
    { value: "NY", label: "New York" },
    { value: "TX", label: "Texas" },
    // Add more states as needed
  ];

  return (
    <div className={styles.step}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact Information</h3>

            {/* CEO Contact */}
            <div className={styles.contactSection}>
              <h4 className={styles.contactTitle}>
                Chief Executive Officer (CEO)
              </h4>

              <div className={styles.checkbox}>
                <input
                  type="checkbox"
                  id="ceoSameAsPrimary"
                  checked={ceoSameAsPrimary}
                  onChange={(e) =>
                    handleSameAsPrimaryChange("ceo", e.target.checked)
                  }
                />
                <label htmlFor="ceoSameAsPrimary">
                  Same as Primary Contact entered in Step 1
                </label>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    First Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    {...register("ceoFirstName", {
                      required: "CEO First Name is required",
                    })}
                    type="text"
                    className={`${styles.input} ${
                      errors.ceoFirstName ? styles.error : ""
                    }`}
                    disabled={ceoSameAsPrimary}
                  />
                  {errors.ceoFirstName && (
                    <span className={styles.errorText}>
                      {errors.ceoFirstName.message}
                    </span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Last Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    {...register("ceoLastName", {
                      required: "CEO Last Name is required",
                    })}
                    type="text"
                    className={`${styles.input} ${
                      errors.ceoLastName ? styles.error : ""
                    }`}
                    disabled={ceoSameAsPrimary}
                  />
                  {errors.ceoLastName && (
                    <span className={styles.errorText}>
                      {errors.ceoLastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Phone <span className={styles.required}>*</span>
                </label>
                <input
                  {...register("ceoPhone", {
                    required: "CEO Phone is required",
                    pattern: {
                      value: /^[\+]?[1-9]?[\d\s\-\(\)]{10,}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  type="tel"
                  className={`${styles.input} ${
                    errors.ceoPhone ? styles.error : ""
                  }`}
                  disabled={ceoSameAsPrimary}
                />
                {errors.ceoPhone && (
                  <span className={styles.errorText}>
                    {errors.ceoPhone.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  {...register("ceoEmail", {
                    required: "CEO Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  className={`${styles.input} ${
                    errors.ceoEmail ? styles.error : ""
                  }`}
                  disabled={ceoSameAsPrimary}
                />
                {errors.ceoEmail && (
                  <span className={styles.errorText}>
                    {errors.ceoEmail.message}
                  </span>
                )}
              </div>
            </div>

            {/* Director of Quality - Similar structure */}
            <div className={styles.contactSection}>
              <h4 className={styles.contactTitle}>Director of Quality</h4>
              {/* Same pattern as CEO but with quality prefix */}
              {/* ... */}
            </div>

            {/* Invoicing Contact - Similar structure */}
            <div className={styles.contactSection}>
              <h4 className={styles.contactTitle}>Invoicing Contact</h4>
              {/* Same pattern but with invoicing prefix */}
              {/* ... */}
            </div>

            {/* Billing Address */}
            <div className={styles.contactSection}>
              <h4 className={styles.contactTitle}>Billing Address</h4>

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
                    {...register("city", { required: "City is required" })}
                    type="text"
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
                        value: /^\d{5}(-\d{4})?$/,
                        message: "Please enter a valid ZIP code",
                      },
                    })}
                    type="text"
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
