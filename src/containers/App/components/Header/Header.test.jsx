import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header";

describe("<Header/>", () => {
  it("should render component", () => {
    const { container } = render(
      <BrowserRouter>
        <Header login={vi.fn()} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
