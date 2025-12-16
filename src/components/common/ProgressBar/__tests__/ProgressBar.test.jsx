import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../ProgressBar";
import { FormProvider } from "/src/contexts/FormContext";

// Helper to render with context
const renderWithContext = (initialStep = 1) => {
  // We need to render with FormProvider and navigate to specific step
  const TestWrapper = ({ children }) => {
    return <FormProvider>{children}</FormProvider>;
  };

  return render(
    <TestWrapper>
      <ProgressBar />
    </TestWrapper>
  );
};

describe("ProgressBar Component", () => {
  it("should render progress bar", () => {
    renderWithContext();
    expect(screen.getByText("DNV Quote Request")).toBeInTheDocument();
  });

  it("should display current step number", () => {
    renderWithContext();
    expect(screen.getByText("Step 1 of 6")).toBeInTheDocument();
  });

  it("should display step title for step 1", () => {
    renderWithContext();
    expect(screen.getByText("New DNV Quote Request")).toBeInTheDocument();
  });

  it("should render all 6 step labels", () => {
    renderWithContext();

    expect(screen.getByText("DNV Quote Request")).toBeInTheDocument();
    expect(screen.getByText("Facility Details")).toBeInTheDocument();
    expect(screen.getByText("Leadership Contacts")).toBeInTheDocument();
    expect(screen.getByText("Site Information")).toBeInTheDocument();
    expect(screen.getByText("Services & Certifications")).toBeInTheDocument();
    expect(screen.getByText("Review & Submit")).toBeInTheDocument();
  });
});
