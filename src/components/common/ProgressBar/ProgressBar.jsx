import { useFormContext } from "/src/contexts/FormContext";
import { FORM_STEPS } from "/src/constants";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  const { currentStep } = useFormContext();

  return (
    <div
      className={styles.progressBar}
      role="navigation"
      aria-label="Form progress"
    >
      <div className={styles.titleSection}>
        <div className={styles.container}>
          <h2 className={styles.title}>{FORM_STEPS[currentStep - 1].title}</h2>
          <span className={styles.stepText} aria-live="polite">
            Step {currentStep} of {FORM_STEPS.length}
          </span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.container}>
          <div
            className={styles.progressLines}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={FORM_STEPS.length}
            aria-label={`Form progress: Step ${currentStep} of ${FORM_STEPS.length}`}
          >
            {FORM_STEPS.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;

              return (
                <div key={index} className={styles.stepContainer}>
                  <div className={styles.progressLineWrapper}>
                    <div
                      className={`${styles.progressLineBackground} ${
                        isCompleted
                          ? styles.completed
                          : isCurrent
                          ? styles.current
                          : styles.inactive
                      }`}
                    />
                    {isCurrent && <div className={styles.progressLineActive} />}
                  </div>
                  <span className={styles.stepLabel}>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
