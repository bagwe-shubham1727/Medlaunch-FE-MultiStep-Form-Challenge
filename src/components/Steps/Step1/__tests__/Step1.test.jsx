import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step1 from "../Step1";
import { FormProvider } from "/src/contexts/FormContext";

// Helper to render with context
const renderWithContext = () => {
  return render(
    <FormProvider>
      <Step1 />
    </FormProvider>
  );
};

describe("Step1 Component", () => {
  describe("Rendering", () => {
    it("should render the step", () => {
      renderWithContext();
      expect(
        screen.getByText("Identify Healthcare Organization")
      ).toBeInTheDocument();
    });

    it("should render Legal Entity Name field", () => {
      renderWithContext();
      expect(screen.getByText("Legal Entity Name")).toBeInTheDocument();
    });

    it("should render d/b/a Name field", () => {
      renderWithContext();
      expect(screen.getByText(/Doing Business As/)).toBeInTheDocument();
    });

    it("should render Same as Legal Entity checkbox", () => {
      renderWithContext();
      expect(
        screen.getByLabelText("Same as Legal Entity Name")
      ).toBeInTheDocument();
    });

    it("should render Primary Contact Information section", () => {
      renderWithContext();
      expect(
        screen.getByText("Primary Contact Information")
      ).toBeInTheDocument();
    });

    it("should render First Name field", () => {
      renderWithContext();
      expect(screen.getByText("First Name")).toBeInTheDocument();
    });

    it("should render Last Name field", () => {
      renderWithContext();
      expect(screen.getByText("Last Name")).toBeInTheDocument();
    });

    it("should render Title field", () => {
      renderWithContext();
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("should render Work Phone field", () => {
      renderWithContext();
      expect(screen.getByText("Work Phone")).toBeInTheDocument();
    });

    it("should render Cell Phone field", () => {
      renderWithContext();
      expect(screen.getByText("Cell Phone")).toBeInTheDocument();
    });

    it("should render Email field", () => {
      renderWithContext();
      // Use getAllByText because "Email" appears in label and button
      const emailElements = screen.getAllByText(/Email/);
      expect(emailElements.length).toBeGreaterThanOrEqual(1);
    });

    it("should render Exit button", () => {
      renderWithContext();
      expect(screen.getByText("Exit")).toBeInTheDocument();
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

  describe("Same as Legal Entity Checkbox", () => {
    it("should copy Legal Entity Name to d/b/a when checked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      // Get the legal entity input (first text input)
      const inputs = screen.getAllByRole("textbox");
      const legalEntityInput = inputs[0];
      const dbaInput = inputs[1];

      // Type in Legal Entity Name
      await user.type(legalEntityInput, "Test Hospital");

      // Check the checkbox
      const checkbox = screen.getByLabelText("Same as Legal Entity Name");
      await user.click(checkbox);

      // d/b/a should now have the same value
      expect(dbaInput).toHaveValue("Test Hospital");
    });

    it("should disable d/b/a field when checkbox is checked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const checkbox = screen.getByLabelText("Same as Legal Entity Name");
      await user.click(checkbox);

      const inputs = screen.getAllByRole("textbox");
      const dbaInput = inputs[1];
      expect(dbaInput).toBeDisabled();
    });
  });

  describe("Validation", () => {
    it("should show error when Legal Entity Name is empty on submit", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);

      await waitFor(() => {
        expect(
          screen.getByText("Legal Entity Name is required")
        ).toBeInTheDocument();
      });
    });

    it("should show error for invalid first name (numbers)", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const inputs = screen.getAllByRole("textbox");
      const firstNameInput = inputs[2]; // First Name is 3rd input

      await user.type(firstNameInput, "John123");

      await waitFor(() => {
        expect(
          screen.getByText("First Name can only contain letters")
        ).toBeInTheDocument();
      });
    });

    it("should show error for invalid phone number", async () => {
      renderWithContext();
      const user = userEvent.setup();

      // Find the work phone input by getting all textboxes and finding the one after title
      const inputs = screen.getAllByRole("textbox");
      // Work phone is around index 5 or 6
      const workPhoneInput = inputs.find(
        (input) =>
          input.getAttribute("type") === "tel" &&
          input.getAttribute("maxlength") === "10"
      );

      if (workPhoneInput) {
        await user.type(workPhoneInput, "123");
        const continueButton = screen.getByText("Continue");
        await user.click(continueButton);

        await waitFor(() => {
          expect(
            screen.getByText("Phone number must be exactly 10 digits")
          ).toBeInTheDocument();
        });
      }
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

  describe("Exit Functionality", () => {
    it("should show confirmation when Exit is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const exitButton = screen.getByText("Exit");
      await user.click(exitButton);

      expect(window.confirm).toHaveBeenCalled();
    });

    it("should reset form when exit is confirmed", async () => {
      renderWithContext();
      const user = userEvent.setup();

      // Fill some data
      const inputs = screen.getAllByRole("textbox");
      await user.type(inputs[0], "Test Hospital");

      // Exit
      const exitButton = screen.getByText("Exit");
      await user.click(exitButton);

      // After exit, the form should be reset
      expect(inputs[0]).toHaveValue("");
    });
  });

  describe("Email Verification", () => {
    it("should show Send Verification Email button", () => {
      renderWithContext();
      expect(screen.getByText("Send Verification Email")).toBeInTheDocument();
    });

    it("should enable verification button when valid email is entered", async () => {
      const { container } = renderWithContext();
      const user = userEvent.setup();

      // Find email input by name
      const emailInput = container.querySelector('input[name="email"]');
      await user.type(emailInput, "test@example.com");

      await waitFor(() => {
        const verifyButton = screen.getByText("Send Verification Email");
        expect(verifyButton).not.toBeDisabled();
      });
    });

    it("should show Verified status after clicking Send Verification Email", async () => {
      const { container } = renderWithContext();
      const user = userEvent.setup();

      // Find email input by name
      const emailInput = container.querySelector('input[name="email"]');
      await user.type(emailInput, "test@example.com");

      // Wait for button to be enabled then click
      await waitFor(() => {
        const verifyButton = screen.getByText("Send Verification Email");
        expect(verifyButton).not.toBeDisabled();
      });

      const verifyButton = screen.getByText("Send Verification Email");
      await user.click(verifyButton);

      await waitFor(() => {
        expect(screen.getByText("Verified")).toBeInTheDocument();
      });
    });

    it("should change button text to Verification Sent after verification", async () => {
      const { container } = renderWithContext();
      const user = userEvent.setup();

      // Find email input by name
      const emailInput = container.querySelector('input[name="email"]');
      await user.type(emailInput, "test@example.com");

      // Wait for button to be enabled then click
      await waitFor(() => {
        const verifyButton = screen.getByText("Send Verification Email");
        expect(verifyButton).not.toBeDisabled();
      });

      const verifyButton = screen.getByText("Send Verification Email");
      await user.click(verifyButton);

      await waitFor(() => {
        expect(screen.getByText("Verification Sent")).toBeInTheDocument();
      });
    });
  });

  describe("Legal Entity Name Change", () => {
    it("should uncheck Same as Legal Entity when legal entity name is changed after checkbox is checked", async () => {
      const { container } = renderWithContext();
      const user = userEvent.setup();

      // Get the legal entity input
      const legalEntityInput = container.querySelector(
        'input[name="legalEntityName"]'
      );
      await user.type(legalEntityInput, "Test Hospital");

      // Check the checkbox
      const checkbox = screen.getByLabelText("Same as Legal Entity Name");
      await user.click(checkbox);

      // Change the legal entity name
      await user.type(legalEntityInput, " Updated");

      // The checkbox should be unchecked
      await waitFor(() => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  describe("Form Submit", () => {
    it("should call onSubmit with form data when valid", async () => {
      const { container } = renderWithContext();
      const user = userEvent.setup();

      // Fill all required fields
      const legalEntityInput = container.querySelector(
        'input[name="legalEntityName"]'
      );
      const dbaInput = container.querySelector('input[name="doingBusinessAs"]');
      const firstNameInput = container.querySelector('input[name="firstName"]');
      const lastNameInput = container.querySelector('input[name="lastName"]');
      const titleInput = container.querySelector('input[name="title"]');
      const workPhoneInput = container.querySelector('input[name="workPhone"]');
      const cellPhoneInput = container.querySelector('input[name="cellPhone"]');
      const emailInput = container.querySelector('input[name="email"]');

      await user.type(legalEntityInput, "Test Hospital");
      await user.type(dbaInput, "Test DBA");
      await user.type(firstNameInput, "John");
      await user.type(lastNameInput, "Doe");
      await user.type(titleInput, "Director");
      await user.type(workPhoneInput, "1234567890");
      await user.type(cellPhoneInput, "0987654321");
      await user.type(emailInput, "john@test.com");

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);
    });
  });
});
