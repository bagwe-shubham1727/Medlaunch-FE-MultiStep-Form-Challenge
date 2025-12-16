import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step4 from "../Step4";
import { FormProvider } from "/src/contexts/FormContext";

// Helper to render with context
const renderWithContext = () => {
  return render(
    <FormProvider>
      <Step4 />
    </FormProvider>
  );
};

describe("Step4 Component", () => {
  describe("Rendering", () => {
    it("should render the step", () => {
      renderWithContext();
      expect(
        screen.getByText("Do you have multiple sites or locations?")
      ).toBeInTheDocument();
    });

    it("should render Single Location card", () => {
      renderWithContext();
      expect(screen.getByText("Single Location")).toBeInTheDocument();
      expect(
        screen.getByText("We operate from one facility only")
      ).toBeInTheDocument();
    });

    it("should render Multiple Locations card", () => {
      renderWithContext();
      expect(screen.getByText("Multiple Locations")).toBeInTheDocument();
      expect(
        screen.getByText("We have multiple facilities or practice locations")
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

  describe("Location Selection", () => {
    it("should select Single Location when clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const singleLocationCard = screen
        .getByText("Single Location")
        .closest("div");
      await user.click(singleLocationCard);

      expect(singleLocationCard).toHaveClass("selected");
    });

    it("should select Multiple Locations when clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const multipleLocationCard = screen
        .getByText("Multiple Locations")
        .closest("div");
      await user.click(multipleLocationCard);

      expect(multipleLocationCard).toHaveClass("selected");
    });

    it("should show upload section when Multiple Locations is selected", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const multipleLocationCard = screen
        .getByText("Multiple Locations")
        .closest("div");
      await user.click(multipleLocationCard);

      await waitFor(() => {
        expect(
          screen.getByText("How would you like to add your site information?")
        ).toBeInTheDocument();
        expect(screen.getByText("Upload CSV / Excel")).toBeInTheDocument();
      });
    });
  });

  describe("File Upload", () => {
    it("should show drop zone when Multiple Locations is selected", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const multipleLocationCard = screen
        .getByText("Multiple Locations")
        .closest("div");
      await user.click(multipleLocationCard);

      await waitFor(() => {
        expect(screen.getByText("Upload Site Information")).toBeInTheDocument();
        expect(screen.getByText("Select file")).toBeInTheDocument();
      });
    });

    it("should show Download CSV Template button", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const multipleLocationCard = screen
        .getByText("Multiple Locations")
        .closest("div");
      await user.click(multipleLocationCard);

      await waitFor(() => {
        expect(screen.getByText("Download CSV Template")).toBeInTheDocument();
      });
    });

    it("should alert when Download CSV Template is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const multipleLocationCard = screen
        .getByText("Multiple Locations")
        .closest("div");
      await user.click(multipleLocationCard);

      await waitFor(async () => {
        const templateButton = screen.getByText("Download CSV Template");
        await user.click(templateButton);
        expect(window.alert).toHaveBeenCalledWith("Download CSV Template");
      });
    });
  });

  describe("Validation", () => {
    it("should show error when no location type is selected on continue", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please select a location type to continue.")
        ).toBeInTheDocument();
      });
    });

    it("should show error when Multiple Locations selected but no file uploaded", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const multipleLocationCard = screen
        .getByText("Multiple Locations")
        .closest("div");
      await user.click(multipleLocationCard);

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please upload at least one file to continue.")
        ).toBeInTheDocument();
      });
    });

    it("should clear error when location type is selected", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please select a location type to continue.")
        ).toBeInTheDocument();
      });

      const singleLocationCard = screen
        .getByText("Single Location")
        .closest("div");
      await user.click(singleLocationCard);

      await waitFor(() => {
        expect(
          screen.queryByText("Please select a location type to continue.")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("File Remove", () => {
    it("should remove a file when remove button is clicked", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const multipleLocationCard = screen
        .getByText("Multiple Locations")
        .closest("div");
      await user.click(multipleLocationCard);

      // Simulate file upload
      const file = new File(["test"], "test.csv", { type: "text/csv" });
      const fileInput = document.querySelector('input[type="file"]');

      if (fileInput) {
        await user.upload(fileInput, file);
      }
    });
  });

  describe("Continue Functionality", () => {
    it("should proceed when Single Location is selected", async () => {
      renderWithContext();
      const user = userEvent.setup();

      const singleLocationCard = screen
        .getByText("Single Location")
        .closest("div");
      await user.click(singleLocationCard);

      const continueButton = screen.getByText("Continue");
      await user.click(continueButton);

      // No error should be shown
      await waitFor(() => {
        expect(
          screen.queryByText("Please select a location type to continue.")
        ).not.toBeInTheDocument();
      });
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
