import { useForm } from "react-hook-form";
import { useFormContext } from "/src/contexts/FormContext";
import Navigation from "../../common/Navigation/Navigation";
import { FACILITY_TYPES } from "/src/constants";
import styles from "./Step2.module.css";

const Step2 = () => {
  const { formData, updateFormData, nextStep, previousStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: formData,
  });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  const handleSave = () => {
    const currentValues = watch();
    updateFormData(currentValues);
    alert("Progress saved!");
  };

  return (
    <div className={styles.step}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Facility and Organization Type
            </h3>

            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>
                Facility Type <span className={styles.required}>*</span>
              </label>

              <div className={styles.radioGroup}>
                {FACILITY_TYPES.map((type, index) => (
                  <div key={index} className={styles.radioOption}>
                    <input
                      {...register("facilityType", {
                        required: "Please select a facility type",
                      })}
                      type="radio"
                      id={`facility-${index}`}
                      value={type}
                      className={styles.radioInput}
                    />
                    <label
                      htmlFor={`facility-${index}`}
                      className={styles.radioLabel}
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
              {errors.facilityType && (
                <span className={styles.errorText}>
                  {errors.facilityType.message}
                </span>
              )}
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

export default Step2;
