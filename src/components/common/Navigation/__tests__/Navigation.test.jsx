import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "../Navigation";

describe("Navigation Component", () => {
  const mockOnPrevious = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnContinue = jest.fn();
  const mockOnExit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render Exit button when showPrevious is false", () => {
      render(
        <Navigation
          showPrevious={false}
          onExit={mockOnExit}
          onSave={mockOnSave}
          onContinue={mockOnContinue}
        />
      );

      expect(screen.getByText("Exit")).toBeInTheDocument();
      expect(screen.queryByText("Previous")).not.toBeInTheDocument();
    });

    it("should render Previous button when showPrevious is true", () => {
      render(
        <Navigation
          showPrevious={true}
          onPrevious={mockOnPrevious}
          onSave={mockOnSave}
          onContinue={mockOnContinue}
        />
      );

      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.queryByText("Exit")).not.toBeInTheDocument();
    });

    it("should render Save button", () => {
      render(<Navigation onSave={mockOnSave} onContinue={mockOnContinue} />);

      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("should render default Continue button text", () => {
      render(<Navigation onSave={mockOnSave} onContinue={mockOnContinue} />);

      expect(screen.getByText("Continue")).toBeInTheDocument();
    });

    it("should render custom button text", () => {
      render(
        <Navigation
          buttonText="Submit Application"
          onSave={mockOnSave}
          onContinue={mockOnContinue}
        />
      );

      expect(screen.getByText("Submit Application")).toBeInTheDocument();
    });
  });

  describe("Button Interactions", () => {
    it("should call onExit when Exit button is clicked", () => {
      render(
        <Navigation
          showPrevious={false}
          onExit={mockOnExit}
          onSave={mockOnSave}
          onContinue={mockOnContinue}
        />
      );

      fireEvent.click(screen.getByText("Exit"));
      expect(mockOnExit).toHaveBeenCalledTimes(1);
    });

    it("should call onPrevious when Previous button is clicked", () => {
      render(
        <Navigation
          showPrevious={true}
          onPrevious={mockOnPrevious}
          onSave={mockOnSave}
          onContinue={mockOnContinue}
        />
      );

      fireEvent.click(screen.getByText("Previous"));
      expect(mockOnPrevious).toHaveBeenCalledTimes(1);
    });

    it("should call onSave when Save button is clicked", () => {
      render(<Navigation onSave={mockOnSave} onContinue={mockOnContinue} />);

      fireEvent.click(screen.getByText("Save"));
      expect(mockOnSave).toHaveBeenCalledTimes(1);
    });

    it("should call onContinue when Continue button is clicked", () => {
      render(<Navigation onSave={mockOnSave} onContinue={mockOnContinue} />);

      fireEvent.click(screen.getByText("Continue"));
      expect(mockOnContinue).toHaveBeenCalledTimes(1);
    });
  });

  describe("Disabled State", () => {
    it("should disable Continue button when disabled prop is true", () => {
      render(
        <Navigation
          onSave={mockOnSave}
          onContinue={mockOnContinue}
          disabled={true}
        />
      );

      const continueButton = screen.getByText("Continue");
      expect(continueButton).toBeDisabled();
    });

    it("should not disable Continue button when disabled prop is false", () => {
      render(
        <Navigation
          onSave={mockOnSave}
          onContinue={mockOnContinue}
          disabled={false}
        />
      );

      const continueButton = screen.getByText("Continue");
      expect(continueButton).not.toBeDisabled();
    });

    it("should have disabled class when disabled", () => {
      render(
        <Navigation
          onSave={mockOnSave}
          onContinue={mockOnContinue}
          disabled={true}
        />
      );

      const continueButton = screen.getByText("Continue");
      expect(continueButton.className).toContain("disabled");
    });
  });
});
