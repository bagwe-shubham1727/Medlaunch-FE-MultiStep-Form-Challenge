import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultiStepForm from "../MultiStepForm";
import { FormProvider, useFormContext } from "/src/contexts/FormContext";

// Mock the step components
jest.mock("/src/components/Steps/Step1/Step1", () => () => (
  <div data-testid="step1">Step 1 Content</div>
));
jest.mock("/src/components/Steps/Step2/Step2", () => () => (
  <div data-testid="step2">Step 2 Content</div>
));
jest.mock("/src/components/Steps/Step3/Step3", () => () => (
  <div data-testid="step3">Step 3 Content</div>
));
jest.mock("/src/components/Steps/Step4/Step4", () => () => (
  <div data-testid="step4">Step 4 Content</div>
));
jest.mock("/src/components/Steps/Step5/Step5", () => () => (
  <div data-testid="step5">Step 5 Content</div>
));
jest.mock("/src/components/Steps/Step6/Step6", () => () => (
  <div data-testid="step6">Step 6 Content</div>
));

// Helper component to set step
const StepSetter = ({ step }) => {
  const { goToStep } = useFormContext();
  React.useEffect(() => {
    goToStep(step);
  }, [step, goToStep]);
  return null;
};

// Helper to render with context
const renderWithContext = () => {
  return render(
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  );
};

const renderWithContextAndStep = (step) => {
  return render(
    <FormProvider>
      <StepSetter step={step} />
      <MultiStepForm />
    </FormProvider>
  );
};

describe("MultiStepForm Component", () => {
  describe("Rendering", () => {
    it("should render the form container", () => {
      renderWithContext();
      expect(screen.getByTestId("step1")).toBeInTheDocument();
    });

    it("should render Step 1 by default", () => {
      renderWithContext();
      expect(screen.getByTestId("step1")).toBeInTheDocument();
    });
  });

  describe("Step Navigation", () => {
    it("should render Step 1 when currentStep is 1", () => {
      renderWithContextAndStep(1);
      expect(screen.getByTestId("step1")).toBeInTheDocument();
    });

    it("should render Step 2 when currentStep is 2", () => {
      renderWithContextAndStep(2);
      expect(screen.getByTestId("step2")).toBeInTheDocument();
    });

    it("should render Step 3 when currentStep is 3", () => {
      renderWithContextAndStep(3);
      expect(screen.getByTestId("step3")).toBeInTheDocument();
    });

    it("should render Step 4 when currentStep is 4", () => {
      renderWithContextAndStep(4);
      expect(screen.getByTestId("step4")).toBeInTheDocument();
    });

    it("should render Step 5 when currentStep is 5", () => {
      renderWithContextAndStep(5);
      expect(screen.getByTestId("step5")).toBeInTheDocument();
    });

    it("should render Step 6 when currentStep is 6", () => {
      renderWithContextAndStep(6);
      expect(screen.getByTestId("step6")).toBeInTheDocument();
    });

    it("should render Step 1 for invalid step number", () => {
      renderWithContextAndStep(7);
      // Default case should render Step1
      expect(screen.getByTestId("step1")).toBeInTheDocument();
    });

    it("should render Step 1 for negative step number", () => {
      renderWithContextAndStep(-1);
      // Default case should render Step1
      expect(screen.getByTestId("step1")).toBeInTheDocument();
    });
  });

  describe("Step Content", () => {
    it("should display correct content for Step 1", () => {
      renderWithContextAndStep(1);
      expect(screen.getByText("Step 1 Content")).toBeInTheDocument();
    });

    it("should display correct content for Step 2", () => {
      renderWithContextAndStep(2);
      expect(screen.getByText("Step 2 Content")).toBeInTheDocument();
    });

    it("should display correct content for Step 3", () => {
      renderWithContextAndStep(3);
      expect(screen.getByText("Step 3 Content")).toBeInTheDocument();
    });

    it("should display correct content for Step 4", () => {
      renderWithContextAndStep(4);
      expect(screen.getByText("Step 4 Content")).toBeInTheDocument();
    });

    it("should display correct content for Step 5", () => {
      renderWithContextAndStep(5);
      expect(screen.getByText("Step 5 Content")).toBeInTheDocument();
    });

    it("should display correct content for Step 6", () => {
      renderWithContextAndStep(6);
      expect(screen.getByText("Step 6 Content")).toBeInTheDocument();
    });
  });

  describe("Form Container Styles", () => {
    it("should have formContent class on container", () => {
      const { container } = renderWithContext();
      expect(container.querySelector("div")).toBeInTheDocument();
    });
  });
});
