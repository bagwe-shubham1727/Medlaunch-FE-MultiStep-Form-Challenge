import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "/src/contexts/FormContext";
import Navigation from "../../common/Navigation/Navigation.jsx";
import styles from "./Step1.module.css";
import CachedIcon from "@mui/icons-material/Cached";

const Step1 = () => {
  const { formData, updateFormData, nextStep, resetForm } = useFormContext();
  const [emailVerified, setEmailVerified] = useState(
    formData.emailVerified || false
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: formData,
    mode: "onChange",
  });

  const sameAsLegalEntity = watch("sameAsLegalEntity");
  const legalEntityName = watch("legalEntityName");
  const email = watch("email");

  const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onSubmit = (data) => {
    updateFormData({ ...data, emailVerified });
    nextStep();
  };

  const handleSameAsLegalChange = (e) => {
    const checked = e.target.checked;
    setValue("sameAsLegalEntity", checked);
    updateFormData({ sameAsLegalEntity: checked });

    if (checked) {
      setValue("doingBusinessAs", legalEntityName);
    } else {
      setValue("doingBusinessAs", "");
    }
  };

  const handleSave = () => {
    const currentValues = watch();
    updateFormData(currentValues);
    alert("Progress saved!");
  };

  const handleVerifyEmail = () => {
    setEmailVerified(true);
    updateFormData({ emailVerified: true });
  };

  const handleResetEmail = () => {
    setValue("email", "");
    setEmailVerified(false);
    updateFormData({ email: "", emailVerified: false });
  };

  const handleLegalEntityChange = (e) => {
    const value = e.target.value;
    if (sameAsLegalEntity) {
      setValue("sameAsLegalEntity", false);
      setValue("doingBusinessAs", "");
      updateFormData({ sameAsLegalEntity: false, doingBusinessAs: "" });
    }
  };

  const handleExit = () => {
    if (
      window.confirm(
        "Are you sure you want to exit? All form data will be lost."
      )
    ) {
      resetForm();
      reset({
        legalEntityName: "",
        doingBusinessAs: "",
        sameAsLegalEntity: false,
        firstName: "",
        lastName: "",
        title: "",
        workPhone: "",
        cellPhone: "",
        email: "",
      });
      setEmailVerified(false);
    }
  };

  return (
    <div className={styles.step}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Identify Healthcare Organization
            </h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Legal Entity Name <span className={styles.required}>*</span>
              </label>
              <input
                {...register("legalEntityName", {
                  required: "Legal Entity Name is required",
                  onChange: handleLegalEntityChange,
                })}
                type="text"
                className={`${styles.input} ${
                  errors.legalEntityName ? styles.error : ""
                }`}
              />
              {errors.legalEntityName && (
                <span className={styles.errorText}>
                  {errors.legalEntityName.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Doing Business As (d/b/a) Name{" "}
                <span className={styles.required}>*</span>
              </label>
              <input
                {...register("doingBusinessAs", {
                  required: "Doing Business As Name is required",
                })}
                type="text"
                className={`${styles.input} ${
                  errors.doingBusinessAs ? styles.error : ""
                }`}
                disabled={sameAsLegalEntity}
              />
              {errors.doingBusinessAs && (
                <span className={styles.errorText}>
                  {errors.doingBusinessAs.message}
                </span>
              )}
            </div>

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="sameAsLegal"
                checked={sameAsLegalEntity}
                onChange={handleSameAsLegalChange}
              />
              <label htmlFor="sameAsLegal">Same as Legal Entity Name</label>
            </div>

            <div className={styles.sectionGap}></div>

            <h3 className={styles.sectionTitle}>Primary Contact Information</h3>
            <p className={styles.sectionSubtitle}>
              Primary contact receives all DNV Healthcare official
              communications
            </p>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "First Name can only contain letters",
                    },
                  })}
                  type="text"
                  className={`${styles.input} ${
                    errors.firstName ? styles.error : ""
                  }`}
                />
                {errors.firstName && (
                  <span className={styles.errorText}>
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  {...register("lastName", {
                    required: "Last Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Last Name can only contain letters",
                    },
                  })}
                  type="text"
                  className={`${styles.input} ${
                    errors.lastName ? styles.error : ""
                  }`}
                />
                {errors.lastName && (
                  <span className={styles.errorText}>
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Title <span className={styles.required}>*</span>
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Title can only contain letters",
                  },
                })}
                type="text"
                className={`${styles.input} ${
                  errors.title ? styles.error : ""
                }`}
              />
              {errors.title && (
                <span className={styles.errorText}>{errors.title.message}</span>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Work Phone <span className={styles.required}>*</span>
                </label>
                <input
                  {...register("workPhone", {
                    required: "Work Phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be exactly 10 digits",
                    },
                  })}
                  type="tel"
                  maxLength={10}
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
                    errors.workPhone ? styles.error : ""
                  }`}
                />
                {errors.workPhone && (
                  <span className={styles.errorText}>
                    {errors.workPhone.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Cell Phone</label>
                <input
                  {...register("cellPhone", {
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be exactly 10 digits",
                    },
                  })}
                  type="tel"
                  maxLength={10}
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
                    errors.cellPhone ? styles.error : ""
                  }`}
                />
                {errors.cellPhone && (
                  <span className={styles.errorText}>
                    {errors.cellPhone.message}
                  </span>
                )}
              </div>
            </div>

            <div className={`${styles.formGroup} ${styles.emailFormGroup}`}>
              <div className={styles.emailLabelRow}>
                <label className={styles.label}>
                  Email <span className={styles.required}>*</span>
                </label>
                <CachedIcon
                  className={styles.refreshIcon}
                  onClick={handleResetEmail}
                  title="Reset email"
                />
              </div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                  onChange: () => {
                    if (emailVerified) {
                      setEmailVerified(false);
                      updateFormData({ emailVerified: false });
                    }
                  },
                })}
                type="email"
                className={`${styles.input} ${
                  errors.email ? styles.error : ""
                }`}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <button
                  type="button"
                  className={styles.verifyButton}
                  onClick={handleVerifyEmail}
                  disabled={emailVerified || !isValidEmail}
                >
                  {emailVerified
                    ? "Verification Sent"
                    : "Send Verification Email"}
                </button>
              </div>
              <div className={styles.formGroup}>
                <span
                  className={
                    emailVerified ? styles.verified : styles.notVerified
                  }
                >
                  {emailVerified ? "Verified" : "Not verified"}
                </span>
              </div>
            </div>
          </section>

          <Navigation
            showPrevious={false}
            buttonText="Continue"
            onSave={handleSave}
            onContinue={handleSubmit(onSubmit)}
            onExit={handleExit}
          />
        </form>
      </div>
    </div>
  );
};

export default Step1;
