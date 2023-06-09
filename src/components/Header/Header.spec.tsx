import { cleanup, render, screen } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Header from ".";

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
  useSession: vi
    .fn()
    .mockReturnValue({ data: null, status: "unauthenticated" }),
}));

describe("Header", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render unauthenticated header", () => {
    render(<Header />);
    const signInButton = screen.getByTestId("signInButton");
    expect(signInButton).to.exist;
    signInButton.click();
    expect(signIn).toHaveBeenCalled();
  });

  it("should render authenticated header", async () => {
    (useSession as Mock).mockReturnValue({
      data: { user: { email: "foo@bar.com" } },
      status: "authenticated",
    });
    render(<Header />);
    expect(screen.getByText("My Account")).to.exist;
    expect(screen.queryByTestId("AuthMenu")).not.toBeNull();
  });

  it("should not render authenticated menu while loading", async () => {
    (useSession as Mock).mockReturnValue({
      data: { user: { email: "foo@bar.com" } },
      status: "loading",
    });
    render(<Header />);
    expect(screen.queryByTestId("AuthMenu")).toBeNull();
  });
});
