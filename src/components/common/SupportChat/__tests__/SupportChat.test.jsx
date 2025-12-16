import React from "react";
import { render, screen } from "@testing-library/react";
import SupportChat from "../SupportChat";

describe("SupportChat Component", () => {
  it("should render support chat button", () => {
    render(<SupportChat />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should display Support Chat text", () => {
    render(<SupportChat />);
    expect(screen.getByText("Support Chat")).toBeInTheDocument();
  });

  it("should render the icon", () => {
    render(<SupportChat />);
    // The button should contain an SVG icon
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });
});
