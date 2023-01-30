import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { Button } from "~/components/Button";

describe("Button", () => {
  test("should render a button with text", () => {
    render(<Button>Content</Button>);
    expect(screen.getByText(/Content/i)).toBeDefined();
  });

  test("should call function 'test' onClick", () => {
    const mockedFunction = vi.fn();
    render(<Button onClick={mockedFunction}>Content</Button>);
    const button = screen.getByText(/Content/i);
    fireEvent.click(button);

    expect(mockedFunction).toHaveBeenCalled();
  });

  test("should not call onClick while disabled", () => {
    const mockedFunction = vi.fn();
    render(
      <Button onClick={mockedFunction} disabled>
        Content
      </Button>
    );
    const button = screen.getByText(/Content/i);
    fireEvent.click(button);

    expect(mockedFunction).toHaveBeenCalledTimes(0);
  });

  test("should not call onClick while loading", () => {
    const mockedFunction = vi.fn();
    render(
      <Button onClick={mockedFunction} loading>
        Content
      </Button>
    );
    const button = screen.getByText(/Content/i);
    fireEvent.click(button);

    expect(mockedFunction).toHaveBeenCalledTimes(0);
  });

  test("should display a different style while active", () => {
    render(<Button active>Content</Button>);
    const button = screen.getByText(/Content/i);

    expect(button.classList.contains("bg-indigo-700")).toBe(true);
  });
});
