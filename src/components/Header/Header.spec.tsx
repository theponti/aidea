import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import Header from ".";

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
  useSession: vi
    .fn()
    .mockReturnValue({ data: null, status: "unauthenticated" }),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render unauthenticated header", () => {
    render(<Header />);
    expect(screen.getByText("Sign In")).to.exist;
  });

  test("should render authenticated header", () => {
    (useSession as Mock).mockReturnValue({
      data: { user: { email: "foo@bar.com" } },
      status: "authenticated",
    });
    render(<Header />);
    expect(screen.getByText("My Account")).to.exist;
  });
});
