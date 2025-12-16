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
    <div className={styles.navigation}>
      <div className={styles.leftButtons}>
        {showPrevious ? (
          <button
            type="button"
            className={styles.previousButton}
            onClick={onPrevious}
          >
            Previous
          </button>
        ) : (
          <button type="button" className={styles.exitButton} onClick={onExit}>
            Exit
          </button>
        )}
      </div>

      <div className={styles.rightButtons}>
        <button type="button" className={styles.saveButton} onClick={onSave}>
          Save
        </button>
        <button
          type="button"
          className={`${styles.continueButton} ${
            disabled ? styles.disabled : ""
          }`}
          onClick={onContinue}
          disabled={disabled}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
