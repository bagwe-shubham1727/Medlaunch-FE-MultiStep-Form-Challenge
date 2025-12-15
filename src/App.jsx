import Header from "/components/common/Header/Header";
import ProgressBar from "/components/common/ProgressBar/ProgressBar";
import SupportChat from "/components/common/SupportChat/SupportChat";
import Step1 from "/components/Steps/Step1/Step1";
import { FormProvider } from "./contexts/FormContext";
import MultiStepForm from "/components/MultiStepForm/MultiStepForm";
import "./App.css";

function App() {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  );
}

export default App;
