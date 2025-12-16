import styles from "./ContactSection.module.css";

const ContactSection = ({
  title,
  prefix,
  register,
  errors,
  sameAsPrimary,
  onSameAsPrimaryChange,
  required = true,
  children,
}) => {
  const getFieldName = (field) => `${prefix}${field}`;

  return (
    <div className={styles.contactSection}>
      <h4 className={styles.contactTitle}>{title}</h4>

      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id={`${prefix}SameAsPrimary`}
          checked={sameAsPrimary}
          onChange={(e) => onSameAsPrimaryChange(prefix, e.target.checked)}
        />
        <label htmlFor={`${prefix}SameAsPrimary`}>
          Same as Primary Contact entered in Step 1
        </label>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            First Name {required && <span className={styles.required}>*</span>}
          </label>
          <input
            {...register(getFieldName("FirstName"), {
              required: required ? `${title} First Name is required` : false,
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "First Name can only contain letters",
              },
            })}
            type="text"
            className={`${styles.input} ${
              errors[getFieldName("FirstName")] ? styles.error : ""
            }`}
            disabled={sameAsPrimary}
          />
          {errors[getFieldName("FirstName")] && (
            <span className={styles.errorText}>
              {errors[getFieldName("FirstName")].message}
            </span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Last Name {required && <span className={styles.required}>*</span>}
          </label>
          <input
            {...register(getFieldName("LastName"), {
              required: required ? `${title} Last Name is required` : false,
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Last Name can only contain letters",
              },
            })}
            type="text"
            className={`${styles.input} ${
              errors[getFieldName("LastName")] ? styles.error : ""
            }`}
            disabled={sameAsPrimary}
          />
          {errors[getFieldName("LastName")] && (
            <span className={styles.errorText}>
              {errors[getFieldName("LastName")].message}
            </span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Phone {required && <span className={styles.required}>*</span>}
        </label>
        <input
          {...register(getFieldName("Phone"), {
            required: required ? `${title} Phone is required` : false,
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
            errors[getFieldName("Phone")] ? styles.error : ""
          }`}
          disabled={sameAsPrimary}
        />
        {errors[getFieldName("Phone")] && (
          <span className={styles.errorText}>
            {errors[getFieldName("Phone")].message}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Email {required && <span className={styles.required}>*</span>}
        </label>
        <input
          {...register(getFieldName("Email"), {
            required: required ? `${title} Email is required` : false,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          type="email"
          className={`${styles.input} ${
            errors[getFieldName("Email")] ? styles.error : ""
          }`}
          disabled={sameAsPrimary}
        />
        {errors[getFieldName("Email")] && (
          <span className={styles.errorText}>
            {errors[getFieldName("Email")].message}
          </span>
        )}
      </div>

      {/* Optional additional content (e.g., Billing Address for Invoicing Contact) */}
      {children}
    </div>
  );
};

export default ContactSection;
