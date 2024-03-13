import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateTaskButton from "./CreateTaskButton";

test("clicking the button navigates to new route", () => {
  const { getByText } = render(
    <MemoryRouter>
      <CreateTaskButton />
    </MemoryRouter>
  );
  fireEvent.click(getByText("Add New Task"));
  expect(window.location.pathname).toBe('/');
});
