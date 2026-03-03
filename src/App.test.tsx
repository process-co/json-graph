import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the app header", () => {
    render(<App />);
    expect(screen.getByText("JSON Graph")).toBeInTheDocument();
    expect(
      screen.getByText("Interactive JSON Tree Renderer")
    ).toBeInTheDocument();
  });

  it("renders the sample JSON tree by default", () => {
    render(<App />);
    expect(screen.getAllByText(/json-graph/).length).toBeGreaterThan(0);
  });

  it("shows error for invalid JSON", () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText("Paste your JSON here...");
    fireEvent.change(textarea, { target: { value: "{invalid json" } });
    fireEvent.click(screen.getByText("Render Tree"));
    expect(screen.getByText(/Expected/i)).toBeInTheDocument();
  });

  it("parses valid JSON input", () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText("Paste your JSON here...");
    fireEvent.change(textarea, {
      target: { value: '{"test": "hello world"}' },
    });
    fireEvent.click(screen.getByText("Render Tree"));
    expect(screen.getByText('"hello world"')).toBeInTheDocument();
  });
});
