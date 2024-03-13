import React from "react";
import { screen, render, fireEvent, getByText } from "@testing-library/react";
import NewTask from "./NewTask";
import { MemoryRouter } from "react-router-dom";

describe("New Task Component", () => {
  it("new task - allow user input title and description", () => {
    render(
      <MemoryRouter>
        <NewTask />
      </MemoryRouter>
    );
    const titleInput = screen.getByTestId("task-title") as HTMLInputElement;
    const descriptionTextarea = screen.getByTestId("task-description") as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionTextarea, {
      target: { value: "Test Description" },
    });
    expect(titleInput.value).toBe("Test Task");
    expect(descriptionTextarea.value).toBe("Test Description");
  });
  it("display error if form incomplete information", () => {
    render(
      <MemoryRouter>
        <NewTask />
      </MemoryRouter>
    );
    const createButton = screen.getByRole("button", { name: "Create" });
    fireEvent.click(createButton);
    const errorMessage = screen.getByText(
      "You need to fill in all information"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
