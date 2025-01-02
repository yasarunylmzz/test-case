import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../src/app/page";

const mockGetUsers = jest.fn();
const mockDeleteUser = jest.fn();
const mockCreateUser = jest.fn();
const mockUpdateUser = jest.fn();

jest.mock("../services/api/users", () => ({
  getUsers: (...args: any) => mockGetUsers(...args),
  deleteUser: (...args: any) => mockDeleteUser(...args),
  createUser: (...args: any) => mockCreateUser(...args),
  updateUser: (...args: any) => mockUpdateUser(...args),
}));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockGetUsers.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                id: 1,
                name: "John",
                surname: "Doe",
                email: "john@example.com",
                created_at: "2024-03-20",
              },
            ]);
          }, 100);
        })
    );

    mockDeleteUser.mockResolvedValue({ success: true });
    mockCreateUser.mockResolvedValue({
      name: "Jane",
      surname: "Smith",
      email: "jane@example.com",
    });
    mockUpdateUser.mockResolvedValue({
      name: "John Updated",
      surname: "Doe Updated",
      email: "john.updated@example.com",
    });
  });

  it("should render user table with correct data and handle delete", async () => {
    render(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const userName = await screen.findByText("John");
    const userSurname = await screen.findByText("Doe");

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Surname")).toBeInTheDocument();
    expect(screen.getByText("Created Date")).toBeInTheDocument();

    expect(userName).toBeInTheDocument();
    expect(userSurname).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    await act(async () => {
      fireEvent.click(checkbox);
    });

    const deleteButton = screen.getByText("Delete");
    await act(async () => {
      fireEvent.click(deleteButton);
      await Promise.resolve();
    });

    expect(mockDeleteUser).toHaveBeenCalledWith(1);
    expect(mockGetUsers).toHaveBeenCalledTimes(1);
  });

  it("should handle create user functionality", async () => {
    render(<Home />);

    await screen.findByText("John");

    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);

    const nameInput = screen.getByLabelText(/name/i);
    const surnameInput = screen.getByLabelText(/surname/i);
    const emailInput = screen.getByLabelText(/email/i);

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jane" } });
      fireEvent.change(surnameInput, { target: { value: "Smith" } });
      fireEvent.change(emailInput, { target: { value: "jane@example.com" } });
    });

    const submitButton = screen.getByText("Submit");
    await act(async () => {
      fireEvent.click(submitButton);
      await Promise.resolve();
    });

    expect(mockCreateUser).toHaveBeenCalledWith({
      name: "Jane",
      surname: "Smith",
      email: "jane@example.com",
    });
  });

  it("should handle update user functionality", async () => {
    render(<Home />);

    await screen.findByText("John");

    const checkbox = screen.getByRole("checkbox");
    await act(async () => {
      fireEvent.click(checkbox);
    });

    const updateButton = screen.getByText("Update");
    fireEvent.click(updateButton);
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const surnameInput = screen.getByRole("textbox", { name: /surname/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John Updated" } });
      fireEvent.change(surnameInput, { target: { value: "Doe Updated" } });
      fireEvent.change(emailInput, {
        target: { value: "john.updated@example.com" },
      });
    });

    const submitButton = screen.getByText("Submit");
    await act(async () => {
      fireEvent.click(submitButton);
      await Promise.resolve();
    });

    expect(mockUpdateUser).toHaveBeenCalledWith({
      name: "John Updated",
      surname: "Doe Updated",
      email: "john.updated@example.com",
    });
  });
});
