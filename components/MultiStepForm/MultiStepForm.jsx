import { useFormContext } from "/src/contexts/FormContext.jsx";
import Header from "../common/Header/Header";
import ProgressBar from "../common/ProgressBar/ProgressBar";
import SupportChat from "../common/SupportChat/SupportChat";
import Step1 from "../Steps/Step1/Step1";
// Import other steps as we create them
import styles from "./MultiStepForm.module.css";

const MultiStepForm = () => {
  const { currentStep, showAlternateStep2 } = useFormContext();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        // Will add Step2 components
        return <div>Step 2 - Coming Soon</div>;
      case 3:
        return <div>Step 3 - Coming Soon</div>;
      case 4:
        return <div>Step 4 - Coming Soon</div>;
      case 5:
        return <div>Step 5 - Coming Soon</div>;
      case 6:
        return <div>Step 6 - Coming Soon</div>;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <ProgressBar />
      {renderStep()}
      <SupportChat />
    </div>
  );
};

export default MultiStepForm;
