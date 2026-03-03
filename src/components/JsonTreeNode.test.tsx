import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import JsonTreeNode from "./JsonTreeNode";

describe("JsonTreeNode", () => {
  it("renders a string value", () => {
    render(<JsonTreeNode value="hello" label="greeting" />);
    expect(screen.getByText('"hello"')).toBeInTheDocument();
    expect(screen.getByText(/greeting/)).toBeInTheDocument();
  });

  it("renders a number value", () => {
    render(<JsonTreeNode value={42} label="count" />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders a boolean value", () => {
    render(<JsonTreeNode value={true} label="active" />);
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  it("renders null value", () => {
    render(<JsonTreeNode value={null} label="empty" />);
    expect(screen.getByText("null")).toBeInTheDocument();
  });

  it("renders an expandable object", () => {
    const data = { name: "test", age: 25 };
    render(<JsonTreeNode value={data} label="person" />);
    expect(screen.getByText(/person/)).toBeInTheDocument();
    expect(screen.getByText("{2}")).toBeInTheDocument();
  });

  it("renders an expandable array", () => {
    const data = ["a", "b", "c"];
    render(<JsonTreeNode value={data} label="items" />);
    expect(screen.getByText(/items/)).toBeInTheDocument();
    expect(screen.getByText("[3]")).toBeInTheDocument();
  });

  it("collapses and expands on click", () => {
    const data = { key: "value" };
    render(<JsonTreeNode value={data} label="obj" defaultExpanded />);

    expect(screen.getByText('"value"')).toBeInTheDocument();

    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);

    expect(screen.queryByText('"value"')).not.toBeInTheDocument();

    fireEvent.click(toggle);
    expect(screen.getByText('"value"')).toBeInTheDocument();
  });

  it("renders deeply nested structures", () => {
    const data = {
      level1: {
        value: "shallow",
      },
    };
    render(<JsonTreeNode value={data} defaultExpanded />);
    expect(screen.getByText('"shallow"')).toBeInTheDocument();
  });
});
