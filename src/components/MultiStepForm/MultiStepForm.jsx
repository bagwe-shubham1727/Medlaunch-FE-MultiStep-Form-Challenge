import { useFormContext } from "/src/contexts/FormContext.jsx";
import Header from "../common/Header/Header";
import ProgressBar from "../common/ProgressBar/ProgressBar";
import SupportChat from "../common/SupportChat/SupportChat";
import Step1 from "../Steps/Step1/Step1";
import styles from "./MultiStepForm.module.css";
import Step2 from "../Steps/Step2/Step2";
import Step3 from "../Steps/Step3/Step3";
import Step4 from "../Steps/Step4/Step4";
import { Step } from "@mui/material";
import Step5 from "../Steps/Step5/Step5";
import Step6 from "../Steps/Step6/Step6";

const MultiStepForm = () => {
  const { currentStep, showAlternateStep2 } = useFormContext();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
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
