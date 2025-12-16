import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step2 from "../Step2";
import { FormProvider } from "/src/contexts/FormContext";

// Helper to render with context
const renderWithContext = () => {
  return render(
    <FormProvider>
      <Step2 />
    </FormProvider>
  );
};

describe("Step2 Component", () => {
  describe("Rendering", () => {
    it("should render the step", () => {
      renderWithContext();
      expect(
        screen.getByText("Facility and Organization Type")
      ).toBeInTheDocument();
    });

    it("should render Facility Type label", () => {
      renderWithContext();
      expect(screen.getByText("Facility Type")).toBeInTheDocument();
    });

    it("should render all facility type options", () => {
      renderWithContext();

      expect(
        screen.getByLabelText("Short-Term Acute Care")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Long-Term Acute Care")).toBeInTheDocument();
      expect(screen.getByLabelText("Critical Access")).toBeInTheDocument();
      expect(screen.getByLabelText("Children's")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Free-Standing Psychiatric")
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Other")).toBeInTheDocument();
    });

    it("should render Previous button", () => {
      renderWithContext();
      expect(screen.getByText("Previous")).toBeInTheDocument();
    });

    it("should render Save button", () => {
      renderWithContext();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("should render Continue button", () => {
      renderWithContext();
      expect(screen.getByText("Continue")).toBeInTheDocument();
    });
  });

  describe("Radio Selection", () => {
    it("should allow selecting a facility type", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const radioButton = screen.getByLabelText("Short-Term Acute Care");
      await user.click(radioButton);

      expect(radioButton).toBeChecked();
    });

    it("should only allow one selection at a time", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const firstOption = screen.getByLabelText("Short-Term Acute Care");
      const secondOption = screen.getByLabelText("Long-Term Acute Care");

      await user.click(firstOption);
      expect(firstOption).toBeChecked();

      await user.click(secondOption);
      expect(firstOption).not.toBeChecked();
      expect(secondOption).toBeChecked();
    });
  });

  describe("Validation", () => {
    it("should show error when no facility type is selected on submit", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please select a facility type")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Navigation", () => {
    it("should call previousStep when Previous is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const previousButton = screen.getByText("Previous");
      await user.click(previousButton);
    });

    it("should proceed when valid facility type is selected", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const radioButton = screen.getByLabelText("Short-Term Acute Care");
      await user.click(radioButton);

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);

      // No error should be shown
      await waitFor(() => {
        expect(
          screen.queryByText("Please select a facility type")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("All Facility Types Selection", () => {
    it("should select Critical Access", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const radioButton = screen.getByLabelText("Critical Access");
      await user.click(radioButton);
      expect(radioButton).toBeChecked();
    });

    it("should select Children's", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const radioButton = screen.getByLabelText("Children's");
      await user.click(radioButton);
      expect(radioButton).toBeChecked();
    });

    it("should select Free-Standing Psychiatric", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const radioButton = screen.getByLabelText("Free-Standing Psychiatric");
      await user.click(radioButton);
      expect(radioButton).toBeChecked();
    });

    it("should select Other", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const radioButton = screen.getByLabelText("Other");
      await user.click(radioButton);
      expect(radioButton).toBeChecked();
    });
  });

  describe("Save Functionality", () => {
    it("should show alert when Save is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const saveButton = screen.getByText("Save");
      await user.click(saveButton);

      expect(window.alert).toHaveBeenCalledWith("Progress saved!");
    });
  });
});
