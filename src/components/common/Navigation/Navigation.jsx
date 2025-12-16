import styles from "./Navigation.module.css";

const Navigation = ({
  showPrevious = false,
  buttonText = "Continue",
  onPrevious,
  onSave,
  onContinue,
  onExit,
  disabled = false,
}) => {
  return (
    <nav className={styles.navigation} aria-label="Form navigation">
      <div className={styles.leftButtons}>
        {showPrevious ? (
          <button
            type="button"
            className={styles.previousButton}
            onClick={onPrevious}
            aria-label="Go to previous step"
          >
            Previous
          </button>
        ) : (
          <button
            type="button"
            className={styles.exitButton}
            onClick={onExit}
            aria-label="Exit form"
          >
            Exit
          </button>
        )}
      </div>

      <div className={styles.rightButtons}>
        <button
          type="button"
          className={styles.saveButton}
          onClick={onSave}
          aria-label="Save current progress"
        >
          Save
        </button>
        <button
          type="button"
          className={`${styles.continueButton} ${
            disabled ? styles.disabled : ""
          }`}
          onClick={onContinue}
          disabled={disabled}
          aria-label={
            buttonText === "Submit Application"
              ? "Submit application"
              : "Continue to next step"
          }
          aria-disabled={disabled}
        >
          {buttonText}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
