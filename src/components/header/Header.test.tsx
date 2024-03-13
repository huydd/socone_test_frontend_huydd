import React from "react";
import { screen, render } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  it("render header correct text", () => {
    render(<Header />);
    const headerText = screen.getByText(/SOC.ONE - Section 3/i);
    expect(headerText).toBeInTheDocument();
  });
  it("render header correct author name", () => {
    render(<Header />);
    const headerText = screen.getByText("Huy Dam Dinh");
    expect(headerText).toBeInTheDocument();
  })
});
