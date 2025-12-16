import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header Component", () => {
  it("should render the header", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should display DNV Healthcare title", () => {
    render(<Header />);
    expect(screen.getByText("DNV Healthcare")).toBeInTheDocument();
  });

  it("should display user avatar with initials", () => {
    render(<Header />);
    expect(screen.getByText("KM")).toBeInTheDocument();
  });

  it("should display user name", () => {
    render(<Header />);
    expect(screen.getByText("Katherine Martinez")).toBeInTheDocument();
  });

  it("should have correct heading level", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("DNV Healthcare");
  });
});
