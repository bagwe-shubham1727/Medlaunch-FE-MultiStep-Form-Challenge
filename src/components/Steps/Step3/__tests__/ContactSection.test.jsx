import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactSection from "../ContactSection";

// Mock register function
const mockRegister = jest.fn((name, options) => ({
  name,
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
}));

const mockOnSameAsPrimaryChange = jest.fn();

const defaultProps = {
  title: "Test Contact",
  prefix: "test",
  register: mockRegister,
  errors: {},
  sameAsPrimary: false,
  onSameAsPrimaryChange: mockOnSameAsPrimaryChange,
  required: true,
};

describe("ContactSection Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the section title", () => {
      render(<ContactSection {...defaultProps} />);
      expect(screen.getByText("Test Contact")).toBeInTheDocument();
    });

    it("should render Same as Primary Contact checkbox", () => {
      render(<ContactSection {...defaultProps} />);
      expect(
        screen.getByLabelText("Same as Primary Contact entered in Step 1")
      ).toBeInTheDocument();
    });

    it("should render First Name field", () => {
      render(<ContactSection {...defaultProps} />);
      expect(screen.getByText("First Name")).toBeInTheDocument();
    });

    it("should render Last Name field", () => {
      render(<ContactSection {...defaultProps} />);
      expect(screen.getByText("Last Name")).toBeInTheDocument();
    });

    it("should render Phone field", () => {
      render(<ContactSection {...defaultProps} />);
      expect(screen.getByText("Phone")).toBeInTheDocument();
    });

    it("should render Email field", () => {
      render(<ContactSection {...defaultProps} />);
      expect(screen.getByText(/Email/)).toBeInTheDocument();
    });

    it("should show required asterisks when required is true", () => {
      render(<ContactSection {...defaultProps} required={true} />);
      const requiredMarks = screen.getAllByText("*");
      expect(requiredMarks.length).toBeGreaterThan(0);
    });

    it("should not show required asterisks when required is false", () => {
      render(<ContactSection {...defaultProps} required={false} />);
      const requiredMarks = screen.queryAllByText("*");
      expect(requiredMarks.length).toBe(0);
    });
  });

  describe("Same as Primary Checkbox", () => {
    it("should call onSameAsPrimaryChange when checkbox is clicked", async () => {
      render(<ContactSection {...defaultProps} />);
      const user = userEvent.setup();

      const checkbox = screen.getByLabelText(
        "Same as Primary Contact entered in Step 1"
      );
      await user.click(checkbox);

      expect(mockOnSameAsPrimaryChange).toHaveBeenCalledWith("test", true);
    });

    it("should disable inputs when sameAsPrimary is true", () => {
      render(<ContactSection {...defaultProps} sameAsPrimary={true} />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });

    it("should enable inputs when sameAsPrimary is false", () => {
      render(<ContactSection {...defaultProps} sameAsPrimary={false} />);

      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).not.toBeDisabled();
      });
    });
  });

  describe("Error Display", () => {
    it("should display First Name error", () => {
      const propsWithErrors = {
        ...defaultProps,
        errors: {
          testFirstName: { message: "First Name is required" },
        },
      };

      render(<ContactSection {...propsWithErrors} />);
      expect(screen.getByText("First Name is required")).toBeInTheDocument();
    });

    it("should display Last Name error", () => {
      const propsWithErrors = {
        ...defaultProps,
        errors: {
          testLastName: { message: "Last Name is required" },
        },
      };

      render(<ContactSection {...propsWithErrors} />);
      expect(screen.getByText("Last Name is required")).toBeInTheDocument();
    });

    it("should display Phone error", () => {
      const propsWithErrors = {
        ...defaultProps,
        errors: {
          testPhone: { message: "Phone is required" },
        },
      };

      render(<ContactSection {...propsWithErrors} />);
      expect(screen.getByText("Phone is required")).toBeInTheDocument();
    });

    it("should display Email error", () => {
      const propsWithErrors = {
        ...defaultProps,
        errors: {
          testEmail: { message: "Email is required" },
        },
      };

      render(<ContactSection {...propsWithErrors} />);
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  describe("Phone Input Restrictions", () => {
    it("should have maxLength of 10 on phone input", () => {
      const { container } = render(<ContactSection {...defaultProps} />);

      // Find phone input by name attribute
      const phoneInput = container.querySelector('input[name="testPhone"]');
      expect(phoneInput).toHaveAttribute("maxLength", "10");
    });
  });

  describe("Children Prop", () => {
    it("should render children when provided", () => {
      render(
        <ContactSection {...defaultProps}>
          <div data-testid="child-content">Additional Content</div>
        </ContactSection>
      );

      expect(screen.getByTestId("child-content")).toBeInTheDocument();
    });
  });
});
