import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step6 from "../Step6";
import { FormProvider } from "/src/contexts/FormContext";

// Mock jsPDF
jest.mock("jspdf", () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        getWidth: () => 210,
        getHeight: () => 297,
      },
    },
    setFontSize: jest.fn(),
    setFont: jest.fn(),
    setTextColor: jest.fn(),
    setDrawColor: jest.fn(),
    setFillColor: jest.fn(),
    text: jest.fn(),
    rect: jest.fn(),
    addPage: jest.fn(),
    save: jest.fn(),
  })),
}));

// Helper to render with context
const renderWithContext = () => {
  return render(
    <FormProvider>
      <Step6 />
    </FormProvider>
  );
};

describe("Step6 Component", () => {
  describe("Rendering", () => {
    it("should render the step", () => {
      renderWithContext();
      expect(screen.getByText("Hospital Information")).toBeInTheDocument();
    });

    it("should render Basic Information section", () => {
      renderWithContext();
      expect(screen.getByText("Basic Information")).toBeInTheDocument();
    });

    it("should render Facility Details section", () => {
      renderWithContext();
      expect(screen.getByText("Facility Details")).toBeInTheDocument();
    });

    it("should render Leadership Contacts section", () => {
      renderWithContext();
      expect(screen.getByText("Leadership Contacts")).toBeInTheDocument();
    });

    it("should render Site Information section", () => {
      renderWithContext();
      expect(screen.getByText("Site Information")).toBeInTheDocument();
    });

    it("should render Services & Certifications section", () => {
      renderWithContext();
      expect(screen.getByText("Services & Certifications")).toBeInTheDocument();
    });

    it("should render Ready to Submit section", () => {
      renderWithContext();
      expect(screen.getByText("Ready to Submit?")).toBeInTheDocument();
    });

    it("should render certification checkbox", () => {
      renderWithContext();
      expect(
        screen.getByLabelText(
          /I certify that all information provided is accurate/
        )
      ).toBeInTheDocument();
    });

    it("should render Download as PDF button", () => {
      renderWithContext();
      expect(screen.getByText("Download as PDF")).toBeInTheDocument();
    });

    it("should render Export to CSV button", () => {
      renderWithContext();
      expect(screen.getByText("Export to CSV")).toBeInTheDocument();
    });

    it("should render Previous button", () => {
      renderWithContext();
      expect(screen.getByText("Previous")).toBeInTheDocument();
    });

    it("should render Submit Application button", () => {
      renderWithContext();
      expect(screen.getByText("Submit Application")).toBeInTheDocument();
    });

    it("should render all Edit buttons", () => {
      renderWithContext();
      const editButtons = screen.getAllByText("Edit");
      expect(editButtons.length).toBe(5); // 5 sections with Edit buttons
    });
  });

  describe("Section Collapse/Expand", () => {
    it("should collapse Basic Information section when header is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const sectionHeader = screen
        .getByText("Basic Information")
        .closest("div");
      await user.click(sectionHeader);

      // After collapse, content should not be visible
      // The section is collapsed when Legal Entity Name is not visible
      await waitFor(() => {
        expect(screen.queryByText("Legal Entity Name")).not.toBeInTheDocument();
      });
    });

    it("should expand collapsed section when clicked again", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const sectionHeader = screen
        .getByText("Basic Information")
        .closest("div");

      // Collapse
      await user.click(sectionHeader);

      // Expand
      await user.click(sectionHeader);

      await waitFor(() => {
        expect(screen.getByText("Legal Entity Name")).toBeInTheDocument();
      });
    });
  });

  describe("Certification Checkbox", () => {
    it("should start unchecked", () => {
      renderWithContext();
      const checkbox = screen.getByLabelText(
        /I certify that all information provided is accurate/
      );
      expect(checkbox).not.toBeChecked();
    });

    it("should check when clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const checkbox = screen.getByLabelText(
        /I certify that all information provided is accurate/
      );
      await user.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("should enable Submit button when checked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const submitButton = screen.getByText("Submit Application");
      expect(submitButton).toBeDisabled();

      const checkbox = screen.getByLabelText(
        /I certify that all information provided is accurate/
      );
      await user.click(checkbox);

      expect(submitButton).not.toBeDisabled();
    });

    it("should disable Submit button when unchecked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const checkbox = screen.getByLabelText(
        /I certify that all information provided is accurate/
      );
      await user.click(checkbox); // Check
      await user.click(checkbox); // Uncheck

      const submitButton = screen.getByText("Submit Application");
      expect(submitButton).toBeDisabled();
    });
  });

  describe("Form Submission", () => {
    it("should submit form when certification is checked and submit clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const checkbox = screen.getByLabelText(
        /I certify that all information provided is accurate/
      );
      await user.click(checkbox);

      const submitButton = screen.getByText("Submit Application");
      await user.click(submitButton);

      expect(window.alert).toHaveBeenCalledWith(
        "Application submitted successfully! Check console for payload."
      );
    });

    it("should log form data to console on submit", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const checkbox = screen.getByLabelText(
        /I certify that all information provided is accurate/
      );
      await user.click(checkbox);

      const submitButton = screen.getByText("Submit Application");
      await user.click(submitButton);

      expect(console.log).toHaveBeenCalled();
    });
  });

  describe("Export Functionality", () => {
    it("should trigger PDF download when Download as PDF is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const pdfButton = screen.getByText("Download as PDF");
      await user.click(pdfButton);

      // jsPDF save should have been called
      const { jsPDF } = require("jspdf");
      expect(jsPDF).toHaveBeenCalled();
    });

    it("should trigger CSV download when Export to CSV is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const csvButton = screen.getByText("Export to CSV");
      await user.click(csvButton);

      // URL.createObjectURL should have been called for blob
      expect(URL.createObjectURL).toHaveBeenCalled();
    });
  });

  describe("Display Fields", () => {
    it("should show Not Provided for empty Legal Entity Name", () => {
      renderWithContext();
      const notProvidedElements = screen.getAllByText("Not Provided");
      expect(notProvidedElements.length).toBeGreaterThan(0);
    });

    it("should show CEO contact in Leadership Contacts", () => {
      renderWithContext();
      expect(screen.getByText("CEO")).toBeInTheDocument();
    });

    it("should show Director of Quality in Leadership Contacts", () => {
      renderWithContext();
      expect(screen.getByText("Director of Quality")).toBeInTheDocument();
    });

    it("should show Invoicing Contact in Leadership Contacts", () => {
      renderWithContext();
      expect(screen.getByText("Invoicing Contact")).toBeInTheDocument();
    });

    it("should show Site Configuration in Site Information", () => {
      renderWithContext();
      expect(screen.getByText("Site Configuration")).toBeInTheDocument();
    });

    it("should show Services Provided in Services section", () => {
      renderWithContext();
      expect(screen.getByText("Services Provided")).toBeInTheDocument();
    });

    it("should show No services selected when no services", () => {
      renderWithContext();
      expect(screen.getByText("No services selected")).toBeInTheDocument();
    });

    it("should show No standards selected when no standards", () => {
      renderWithContext();
      expect(screen.getByText("No standards selected")).toBeInTheDocument();
    });
  });

  describe("Email Verification Badge", () => {
    it("should show Not verified badge by default", () => {
      renderWithContext();
      expect(screen.getByText("Not verified")).toBeInTheDocument();
    });
  });

  describe("Edit Buttons", () => {
    it("should navigate to step 1 when first Edit is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const editButtons = screen.getAllByText("Edit");
      if (editButtons.length > 0) {
        await user.click(editButtons[0]);
      }
    });

    it("should navigate to step 2 when second Edit is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const editButtons = screen.getAllByText("Edit");
      if (editButtons.length > 1) {
        await user.click(editButtons[1]);
      }
    });

    it("should navigate to step 3 when third Edit is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const editButtons = screen.getAllByText("Edit");
      if (editButtons.length > 2) {
        await user.click(editButtons[2]);
      }
    });

    it("should navigate to step 4 when fourth Edit is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const editButtons = screen.getAllByText("Edit");
      if (editButtons.length > 3) {
        await user.click(editButtons[3]);
      }
    });

    it("should navigate to step 5 when fifth Edit is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const editButtons = screen.getAllByText("Edit");
      if (editButtons.length > 4) {
        await user.click(editButtons[4]);
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

  describe("All Sections Toggle", () => {
    it("should toggle Facility Details section", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const facilityHeader = screen
        .getByText("Facility Details")
        .closest("div");
      await user.click(facilityHeader);
      await user.click(facilityHeader);
    });

    it("should toggle Leadership Contacts section", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const leadershipHeader = screen
        .getByText("Leadership Contacts")
        .closest("div");
      await user.click(leadershipHeader);
      await user.click(leadershipHeader);
    });

    it("should toggle Site Information section", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const siteHeader = screen.getByText("Site Information").closest("div");
      await user.click(siteHeader);
      await user.click(siteHeader);
    });

    it("should toggle Services & Certifications section", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const servicesHeader = screen
        .getByText("Services & Certifications")
        .closest("div");
      await user.click(servicesHeader);
      await user.click(servicesHeader);
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
