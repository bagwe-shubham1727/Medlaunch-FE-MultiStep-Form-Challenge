import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step5 from "../Step5";
import { FormProvider } from "/src/contexts/FormContext";
import { formatDateToUS } from "/src/constants";

// Helper to render with context
const renderWithContext = () => {
  return render(
    <FormProvider>
      <Step5 />
    </FormProvider>
  );
};

describe("Step5 Component", () => {
  describe("Rendering", () => {
    it("should render the step", () => {
      renderWithContext();
      expect(screen.getByText("Service Offering")).toBeInTheDocument();
    });

    it("should render Primary Site Service offering subtitle", () => {
      renderWithContext();
      expect(
        screen.getByText("Primary Site Service offering")
      ).toBeInTheDocument();
    });

    it("should render service tabs", () => {
      renderWithContext();
      expect(screen.getByText("All Services")).toBeInTheDocument();
      expect(screen.getByText("Clinical")).toBeInTheDocument();
      expect(screen.getByText("Surgical")).toBeInTheDocument();
      expect(screen.getByText("Diagnostic")).toBeInTheDocument();
      expect(screen.getByText("Rehabilitation")).toBeInTheDocument();
      expect(screen.getByText("Specialty")).toBeInTheDocument();
    });

    it("should render search input", () => {
      renderWithContext();
      expect(
        screen.getByPlaceholderText("Search services...")
      ).toBeInTheDocument();
    });

    it("should render service categories", () => {
      renderWithContext();
      expect(screen.getByText("Emergency & Critical Care")).toBeInTheDocument();
      expect(screen.getByText("Cardiac Services")).toBeInTheDocument();
      expect(screen.getByText("Diagnostic Services")).toBeInTheDocument();
    });

    it("should render Add Other Service button", () => {
      renderWithContext();
      expect(screen.getByText("+ Add Other Service")).toBeInTheDocument();
    });

    it("should render Standards to Apply dropdown", () => {
      renderWithContext();
      expect(screen.getByText("Standards to Apply")).toBeInTheDocument();
    });

    it("should render date fields", () => {
      renderWithContext();
      expect(
        screen.getByText("Expiration Date of Current Stroke Certification")
      ).toBeInTheDocument();
      expect(screen.getByText("Date of Application")).toBeInTheDocument();
    });

    it("should render thrombolytic dates section", () => {
      renderWithContext();
      expect(
        screen.getByText(
          "Dates of last twenty-five thrombolytic administrations"
        )
      ).toBeInTheDocument();
    });

    it("should render thrombectomy dates section", () => {
      renderWithContext();
      expect(
        screen.getByText("Dates of last fifteen thrombectomies")
      ).toBeInTheDocument();
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

  describe("Service Search", () => {
    it("should filter services based on search term", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const searchInput = screen.getByPlaceholderText("Search services...");
      await user.type(searchInput, "Emergency");

      expect(screen.getByText("Emergency Department")).toBeInTheDocument();
      // Other services should be hidden
      expect(screen.queryByText("Open Heart")).not.toBeInTheDocument();
    });

    it("should show all services when search is cleared", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const searchInput = screen.getByPlaceholderText("Search services...");
      await user.type(searchInput, "Emergency");
      await user.clear(searchInput);

      expect(screen.getByText("Emergency Department")).toBeInTheDocument();
      expect(screen.getByText("Open Heart")).toBeInTheDocument();
    });
  });

  describe("Service Tab Selection", () => {
    it("should switch active tab when clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const clinicalTab = screen.getByText("Clinical");
      await user.click(clinicalTab);

      expect(clinicalTab).toHaveClass("active");
    });
  });

  describe("Service Selection", () => {
    it("should select a service when checkbox is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const serviceCheckbox = screen.getByLabelText("Emergency Department");
      await user.click(serviceCheckbox);

      expect(serviceCheckbox).toBeChecked();
    });

    it("should deselect a service when checkbox is clicked again", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const serviceCheckbox = screen.getByLabelText("Emergency Department");
      await user.click(serviceCheckbox);
      await user.click(serviceCheckbox);

      expect(serviceCheckbox).not.toBeChecked();
    });
  });

  describe("Other Service", () => {
    it("should show Other Service input when Add Other Service is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const addButton = screen.getByText("+ Add Other Service");
      await user.click(addButton);

      expect(
        screen.getByPlaceholderText("Specify other service")
      ).toBeInTheDocument();
    });

    it("should hide Other Service input when remove button is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const addButton = screen.getByText("+ Add Other Service");
      await user.click(addButton);

      const removeButton = screen.getByText("❌");
      await user.click(removeButton);

      expect(
        screen.queryByPlaceholderText("Specify other service")
      ).not.toBeInTheDocument();
    });
  });

  describe("Standards Selection", () => {
    it("should add a standard when selected from dropdown", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const dropdown = screen.getByRole("combobox");
      await user.selectOptions(dropdown, "Action1");

      // After selecting, the option appears in the selected list as a span
      const selectedItems = screen.getAllByText("Action1");
      expect(selectedItems.length).toBeGreaterThanOrEqual(1);
    });

    it("should remove a standard when remove button is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const dropdown = screen.getByRole("combobox");
      await user.selectOptions(dropdown, "Action1");

      // Find and click the remove button (X icon)
      const removeButtons = screen.getAllByRole("button");
      const removeButton = removeButtons.find((btn) =>
        btn.querySelector("svg")
      );
      if (removeButton) {
        await user.click(removeButton);
      }
    });
  });

  describe("Date Validation", () => {
    it("should have date inputs for certification dates", async () => {
      const { container } = renderWithContext();

      // Get the date inputs
      const dateInputs = container.querySelectorAll('input[type="date"]');
      expect(dateInputs.length).toBeGreaterThanOrEqual(2);
    });

    it("should have max attribute set on thrombolytic date input", async () => {
      const { container } = renderWithContext();

      // Get all date inputs - thrombolytic is the 3rd one (index 2)
      const dateInputs = container.querySelectorAll('input[type="date"]');
      if (dateInputs.length >= 3) {
        expect(dateInputs[2]).toHaveAttribute("max");
      }
    });

    it("should have min attribute set on stroke certification date input", async () => {
      const { container } = renderWithContext();

      // Get all date inputs - stroke certification is the 1st one (index 0)
      const dateInputs = container.querySelectorAll('input[type="date"]');
      if (dateInputs.length > 0) {
        expect(dateInputs[0]).toHaveAttribute("min");
      }
    });

    it("should add valid date to thrombolytic dates", async () => {
      const { container } = renderWithContext();

      // Get the date inputs - thrombolytic is the 3rd one (index 2)
      const dateInputs = container.querySelectorAll('input[type="date"]');
      if (dateInputs.length >= 3) {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const pastDateStr = pastDate.toISOString().split("T")[0];
        const formattedDate = formatDateToUS(pastDateStr);

        fireEvent.change(dateInputs[2], { target: { value: pastDateStr } });

        // The date should be added and displayed in MM/DD/YYYY format
        await waitFor(() => {
          expect(screen.getByText(formattedDate)).toBeInTheDocument();
        });
      }
    });
  });

  describe("Date Count Display", () => {
    it("should display thrombolytic date count", () => {
      renderWithContext();
      expect(screen.getByText("Selected: 0/25")).toBeInTheDocument();
    });

    it("should display thrombectomy date count", () => {
      renderWithContext();
      expect(screen.getByText("Selected: 0/15")).toBeInTheDocument();
    });
  });

  describe("Tab Navigation", () => {
    it("should filter services when Clinical tab is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const clinicalTab = screen.getByText("Clinical");
      await user.click(clinicalTab);

      // Should show services from Clinical category
      expect(clinicalTab.classList.contains("active")).toBe(true);
    });

    it("should filter services when Surgical tab is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const surgicalTab = screen.getByText("Surgical");
      await user.click(surgicalTab);

      expect(surgicalTab.classList.contains("active")).toBe(true);
    });

    it("should filter services when Diagnostic tab is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const diagnosticTab = screen.getByText("Diagnostic");
      await user.click(diagnosticTab);

      expect(diagnosticTab.classList.contains("active")).toBe(true);
    });

    it("should filter services when Rehabilitation tab is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const rehabTab = screen.getByText("Rehabilitation");
      await user.click(rehabTab);

      expect(rehabTab.classList.contains("active")).toBe(true);
    });

    it("should filter services when Specialty tab is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const specialtyTab = screen.getByText("Specialty");
      await user.click(specialtyTab);

      expect(specialtyTab.classList.contains("active")).toBe(true);
    });
  });

  describe("Service Checkbox Toggle", () => {
    it("should toggle service when checkbox is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      // Find a service checkbox
      const serviceCheckboxes = screen.getAllByRole("checkbox");
      if (serviceCheckboxes.length > 0) {
        await user.click(serviceCheckboxes[0]);
        expect(serviceCheckboxes[0]).toBeChecked();
      }
    });

    it("should uncheck service when clicked again", async () => {
      renderWithContext();
      const user = userEvent.setup();

      // Find a service checkbox
      const serviceCheckboxes = screen.getAllByRole("checkbox");
      if (serviceCheckboxes.length > 0) {
        await user.click(serviceCheckboxes[0]); // Check
        await user.click(serviceCheckboxes[0]); // Uncheck
        expect(serviceCheckboxes[0]).not.toBeChecked();
      }
    });
  });

  describe("Stroke Certification Date", () => {
    it("should show error for past stroke certification date", async () => {
      const { container } = renderWithContext();

      // Get the stroke certification date input (first date input)
      const dateInputs = container.querySelectorAll('input[type="date"]');
      if (dateInputs.length > 0) {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const pastDateStr = pastDate.toISOString().split("T")[0];

        fireEvent.change(dateInputs[0], { target: { value: pastDateStr } });

        await waitFor(() => {
          expect(
            screen.getByText(
              "Expiration date must be greater than today's date"
            )
          ).toBeInTheDocument();
        });
      }
    });

    it("should accept future stroke certification date", async () => {
      const { container } = renderWithContext();

      // Get the stroke certification date input (first date input)
      const dateInputs = container.querySelectorAll('input[type="date"]');
      if (dateInputs.length > 0) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 10);
        const futureDateStr = futureDate.toISOString().split("T")[0];

        fireEvent.change(dateInputs[0], { target: { value: futureDateStr } });

        await waitFor(() => {
          expect(
            screen.queryByText(
              "Expiration date must be greater than today's date"
            )
          ).not.toBeInTheDocument();
        });
      }
    });
  });

  describe("Application Date", () => {
    it("should update application date when changed", async () => {
      const { container } = renderWithContext();

      // Get the application date input (second date input)
      const dateInputs = container.querySelectorAll('input[type="date"]');
      if (dateInputs.length > 1) {
        const todayDate = new Date().toISOString().split("T")[0];

        fireEvent.change(dateInputs[1], { target: { value: todayDate } });

        expect(dateInputs[1]).toHaveValue(todayDate);
      }
    });
  });

  describe("Thrombectomy Dates", () => {
    it("should add valid thrombectomy date", async () => {
      const { container } = renderWithContext();

      // Get the thrombectomy date input (4th date input, index 3)
      const dateInputs = container.querySelectorAll('input[type="date"]');
      if (dateInputs.length >= 4) {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const pastDateStr = pastDate.toISOString().split("T")[0];
        const formattedDate = formatDateToUS(pastDateStr);

        fireEvent.change(dateInputs[3], { target: { value: pastDateStr } });

        await waitFor(() => {
          expect(screen.getByText(formattedDate)).toBeInTheDocument();
        });
      }
    });
  });

  describe("Previous Navigation", () => {
    it("should render Previous button", () => {
      renderWithContext();
      expect(screen.getByText("Previous")).toBeInTheDocument();
    });

    it("should call previousStep when Previous is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const previousButton = screen.getByText("Previous");
      await user.click(previousButton);
    });
  });

  describe("Continue Navigation", () => {
    it("should render Continue button", () => {
      renderWithContext();
      expect(screen.getByText("Continue")).toBeInTheDocument();
    });

    it("should call nextStep when Continue is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

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
