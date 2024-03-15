import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import TaskItem from "./TaskItem";
import { MemoryRouter } from "react-router-dom";

describe("TaskItem Component", () => {
  it("remove task and refresh list tasks", async () => {
    const mockData = {
      id: 1,
      title: "Task 1",
      description: "Description for Task 1",
      status: "pending",
      dueDate: "2024-03-16",
    };
    const mockOnDelete = jest.fn();
    render(
      <MemoryRouter>
        <TaskItem data={mockData} onDelete={mockOnDelete} />
      </MemoryRouter>
    );
    const deleteButton = screen.getByText("Remove");
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(mockData.id);
    });
    expect(mockOnDelete).toHaveBeenCalledWith(mockData.id);
  });
});
