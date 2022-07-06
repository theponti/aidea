import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Header from "./Header";

let isAuthenticated;

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: vi.fn(() => ({ isAuthenticated })),
}));

describe("<Header/>", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render unauthenticated header", () => {
    isAuthenticated = false;
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render authenticated header", () => {
    isAuthenticated = true;
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
