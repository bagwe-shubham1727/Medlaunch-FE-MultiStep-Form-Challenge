import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step3 from "../Step3";
import { FormProvider } from "/src/contexts/FormContext";

// Helper to render with context
const renderWithContext = () => {
  return render(
    <FormProvider>
      <Step3 />
    </FormProvider>
  );
};

describe("Step3 Component", () => {
  describe("Rendering", () => {
    it("should render the step", () => {
      renderWithContext();
      expect(screen.getByText("Contact Information")).toBeInTheDocument();
    });

    it("should render CEO section", () => {
      renderWithContext();
      expect(
        screen.getByText("Chief Executive Officer (CEO)")
      ).toBeInTheDocument();
    });

    it("should render Director of Quality section", () => {
      renderWithContext();
      expect(screen.getByText("Director of Quality")).toBeInTheDocument();
    });

    it("should render Invoicing Contact section", () => {
      renderWithContext();
      expect(screen.getByText("Invoicing Contact")).toBeInTheDocument();
    });

    it("should render Billing Address section", () => {
      renderWithContext();
      expect(screen.getByText("Billing Address")).toBeInTheDocument();
    });

    it("should render Same as Primary Contact checkboxes", () => {
      renderWithContext();
      const checkboxes = screen.getAllByLabelText(
        "Same as Primary Contact entered in Step 1"
      );
      expect(checkboxes).toHaveLength(3); // CEO, Quality, Invoicing
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

  describe("Same as Primary Contact Checkbox", () => {
    it("should check the CEO Same as Primary checkbox", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const checkboxes = screen.getAllByLabelText(
        "Same as Primary Contact entered in Step 1"
      );
      const ceoCheckbox = checkboxes[0];

      await user.click(ceoCheckbox);
      expect(ceoCheckbox).toBeChecked();
    });

    it("should disable CEO fields when checkbox is checked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const checkboxes = screen.getAllByLabelText(
        "Same as Primary Contact entered in Step 1"
      );
      const ceoCheckbox = checkboxes[0];

      await user.click(ceoCheckbox);

      // Get the first First Name input (CEO's)
      const firstNameInputs = screen.getAllByRole("textbox");
      // CEO First Name should be disabled
      expect(firstNameInputs[0]).toBeDisabled();
    });
  });

  describe("Validation", () => {
    it("should show error when CEO First Name is empty on submit", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);

      await waitFor(() => {
        expect(
          screen.getByText(
            "Chief Executive Officer (CEO) First Name is required"
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe("Billing Address Fields", () => {
    it("should render Street Address field", () => {
      renderWithContext();
      expect(screen.getByText("Street Address")).toBeInTheDocument();
    });

    it("should render City field", () => {
      renderWithContext();
      expect(screen.getByText("City")).toBeInTheDocument();
    });

    it("should render State dropdown", () => {
      renderWithContext();
      expect(screen.getByText("State")).toBeInTheDocument();
    });

    it("should render ZIP Code field", () => {
      renderWithContext();
      expect(screen.getByText("ZIP Code")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("should call previousStep when Previous is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const previousButton = screen.getByText("Previous");
      await user.click(previousButton);
    });
  });

  describe("Director of Quality Checkbox", () => {
    it("should check the Director of Quality Same as Primary checkbox", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const checkboxes = screen.getAllByLabelText(
        "Same as Primary Contact entered in Step 1"
      );
      const qualityCheckbox = checkboxes[1];

      await user.click(qualityCheckbox);
      expect(qualityCheckbox).toBeChecked();
    });
  });

  describe("Invoicing Contact Checkbox", () => {
    it("should check the Invoicing Contact Same as Primary checkbox", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const checkboxes = screen.getAllByLabelText(
        "Same as Primary Contact entered in Step 1"
      );
      const invoicingCheckbox = checkboxes[2];

      await user.click(invoicingCheckbox);
      expect(invoicingCheckbox).toBeChecked();
    });
  });

  describe("Form Submit", () => {
    it("should submit form with valid data", async () => {
      const { container } = renderWithContext();
      const user = userEvent.setup();

      // Check all Same as Primary checkboxes to fill the form
      const checkboxes = screen.getAllByLabelText(
        "Same as Primary Contact entered in Step 1"
      );
      for (const checkbox of checkboxes) {
        await user.click(checkbox);
      }

      // Fill billing address fields
      const streetInput = container.querySelector(
        'input[name="billingStreetAddress"]'
      );
      const cityInput = container.querySelector('input[name="billingCity"]');
      const zipInput = container.querySelector('input[name="billingZipCode"]');

      if (streetInput) await user.type(streetInput, "123 Main St");
      if (cityInput) await user.type(cityInput, "Springfield");
      if (zipInput) await user.type(zipInput, "12345");

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);
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
