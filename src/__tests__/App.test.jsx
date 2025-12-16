import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock the components
jest.mock("/src/components/MultiStepForm/MultiStepForm", () => () => (
  <div data-testid="multi-step-form">MultiStepForm</div>
));
jest.mock("/src/contexts/FormContext", () => ({
  FormProvider: ({ children }) => (
    <div data-testid="form-provider">{children}</div>
  ),
}));

describe("App Component", () => {
  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(<App />);
      expect(screen.getByTestId("form-provider")).toBeInTheDocument();
    });

    it("should render MultiStepForm component", () => {
      render(<App />);
      expect(screen.getByTestId("multi-step-form")).toBeInTheDocument();
    });

    it("should render FormProvider as wrapper", () => {
      render(<App />);
      const formProvider = screen.getByTestId("form-provider");
      expect(formProvider).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("should have MultiStepForm in the DOM", () => {
      render(<App />);
      expect(screen.getByTestId("multi-step-form")).toBeInTheDocument();
    });

    it("should render MultiStepForm within provider", () => {
      render(<App />);
      const formProvider = screen.getByTestId("form-provider");

      // MultiStepForm should be within the form provider
      expect(formProvider).toContainElement(
        screen.getByTestId("multi-step-form")
      );
    });
  });
});
