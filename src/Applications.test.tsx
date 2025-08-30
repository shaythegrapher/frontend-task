import { render, screen } from "@testing-library/react";
import Applications from "./Applications";
import { describe, it, expect } from "vitest";

describe("Applications component", () => {
  it("renders without crashing", () => {
    render(<Applications />);
    expect(screen.getByText(/Load More/i)).toBeInTheDocument();
  });
});
