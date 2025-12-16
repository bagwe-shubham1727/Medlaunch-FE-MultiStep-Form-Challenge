import React from "react";
import { render, screen, act } from "@testing-library/react";
import { FormProvider, useFormContext } from "../FormContext";

// Test component that uses the context
const TestConsumer = () => {
  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    previousStep,
    goToStep,
    resetForm,
    showAlternateStep2,
  } = useFormContext();

  return (
    <div>
      <span data-testid="current-step">{currentStep}</span>
      <span data-testid="legal-entity">{formData.legalEntityName}</span>
      <span data-testid="email-verified">
        {formData.emailVerified.toString()}
      </span>
      <span data-testid="show-alternate">
        {showAlternateStep2().toString()}
      </span>
      <button data-testid="next-step" onClick={nextStep}>
        Next
      </button>
      <button data-testid="previous-step" onClick={previousStep}>
        Previous
      </button>
      <button data-testid="go-to-step-3" onClick={() => goToStep(3)}>
        Go to 3
      </button>
      <button data-testid="go-to-step-invalid" onClick={() => goToStep(10)}>
        Go to 10
      </button>
      <button data-testid="go-to-step-zero" onClick={() => goToStep(0)}>
        Go to 0
      </button>
      <button data-testid="reset-form" onClick={resetForm}>
        Reset
      </button>
      <button
        data-testid="update-form"
        onClick={() => updateFormData({ legalEntityName: "Test Hospital" })}
      >
        Update
      </button>
      <button
        data-testid="set-same-as-legal"
        onClick={() => updateFormData({ sameAsLegalEntity: true })}
      >
        Set Same As Legal
      </button>
    </div>
  );
};

describe("FormContext", () => {
  describe("FormProvider", () => {
    it("should render children", () => {
      render(
        <FormProvider>
          <div data-testid="child">Child Component</div>
        </FormProvider>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("should provide initial form data", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );
      expect(screen.getByTestId("current-step")).toHaveTextContent("1");
      expect(screen.getByTestId("legal-entity")).toHaveTextContent("");
      expect(screen.getByTestId("email-verified")).toHaveTextContent("false");
    });
  });

  describe("useFormContext", () => {
    it("should throw error when used outside FormProvider", () => {
      // Suppress console.error for this test
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => render(<TestConsumer />)).toThrow(
        "useFormContext must be used within FormProvider"
      );

      consoleSpy.mockRestore();
    });
  });

  describe("updateFormData", () => {
    it("should update form data", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      act(() => {
        screen.getByTestId("update-form").click();
      });

      expect(screen.getByTestId("legal-entity")).toHaveTextContent(
        "Test Hospital"
      );
    });
  });

  describe("Step Navigation", () => {
    it("should go to next step", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      expect(screen.getByTestId("current-step")).toHaveTextContent("1");

      act(() => {
        screen.getByTestId("next-step").click();
      });

      expect(screen.getByTestId("current-step")).toHaveTextContent("2");
    });

    it("should not go beyond step 6", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      // Go to step 6
      for (let i = 0; i < 6; i++) {
        act(() => {
          screen.getByTestId("next-step").click();
        });
      }

      expect(screen.getByTestId("current-step")).toHaveTextContent("6");

      // Try to go beyond
      act(() => {
        screen.getByTestId("next-step").click();
      });

      expect(screen.getByTestId("current-step")).toHaveTextContent("6");
    });

    it("should go to previous step", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      // Go to step 2 first
      act(() => {
        screen.getByTestId("next-step").click();
      });

      expect(screen.getByTestId("current-step")).toHaveTextContent("2");

      act(() => {
        screen.getByTestId("previous-step").click();
      });

      expect(screen.getByTestId("current-step")).toHaveTextContent("1");
    });

    it("should not go below step 1", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      act(() => {
        screen.getByTestId("previous-step").click();
      });

      expect(screen.getByTestId("current-step")).toHaveTextContent("1");
    });

    it("should go to specific step with goToStep", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      act(() => {
        screen.getByTestId("go-to-step-3").click();
      });

      expect(screen.getByTestId("current-step")).toHaveTextContent("3");
    });

    it("should not go to invalid step (above 6)", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      act(() => {
        screen.getByTestId("go-to-step-invalid").click();
      });

      expect(screen.getByTestId("current-step")).toHaveTextContent("1");
    });

    it("should not go to invalid step (below 1)", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      act(() => {
        screen.getByTestId("go-to-step-zero").click();
      });

      expect(screen.getByTestId("current-step")).toHaveTextContent("1");
    });
  });

  describe("resetForm", () => {
    it("should reset form data and step to initial state", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      // Update some data
      act(() => {
        screen.getByTestId("update-form").click();
        screen.getByTestId("next-step").click();
      });

      expect(screen.getByTestId("legal-entity")).toHaveTextContent(
        "Test Hospital"
      );
      expect(screen.getByTestId("current-step")).toHaveTextContent("2");

      // Reset
      act(() => {
        screen.getByTestId("reset-form").click();
      });

      expect(screen.getByTestId("legal-entity")).toHaveTextContent("");
      expect(screen.getByTestId("current-step")).toHaveTextContent("1");
    });
  });

  describe("showAlternateStep2", () => {
    it("should return false when sameAsLegalEntity is false", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      expect(screen.getByTestId("show-alternate")).toHaveTextContent("false");
    });

    it("should return true when sameAsLegalEntity is true", () => {
      render(
        <FormProvider>
          <TestConsumer />
        </FormProvider>
      );

      act(() => {
        screen.getByTestId("set-same-as-legal").click();
      });

      expect(screen.getByTestId("show-alternate")).toHaveTextContent("true");
    });
  });
});
