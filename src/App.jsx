import { FormProvider } from "./contexts/FormContext";
import MultiStepForm from "/src/components/MultiStepForm/MultiStepForm.jsx";

function App() {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  );
}

export default App;
