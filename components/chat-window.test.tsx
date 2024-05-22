import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as aiReact from "ai/react";
import { describe, expect, test, vi } from "vitest";
import { ChatWindow } from "./chat-window";

vi.mock("ai/react");

describe("ChatWindow", () => {
  const mockEndpoint = "http://localhost:3000/api/chat";
  const mockEmptyStateComponent = <div>Empty State</div>;
  const mockPlaceholder = "Type a message...";
  const mockTitleText = "Chat Window";
  const mockEmoji = "😀";

  test("renders without crashing", () => {
    vi.spyOn(aiReact, "useChat").mockReturnValue({
      messages: [],
      handleSubmit: () => {},
      setMessages: () => {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ChatWindow
          endpoint={mockEndpoint}
          emptyStateComponent={mockEmptyStateComponent}
          titleText={mockTitleText}
          emoji={mockEmoji}
        />
      </QueryClientProvider>,
    );

    expect(
      screen.queryByText(`${mockEmoji} ${mockTitleText}`),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("chat-form-button-status"),
    ).not.toBeInTheDocument();
  });

  test("displays the title text and emoji when messages exist", async () => {
    vi.spyOn(aiReact, "useChat").mockReturnValue({
      messages: [
        {
          id: "1",
          content: "Test message",
          role: "user",
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ChatWindow
          endpoint={mockEndpoint}
          emptyStateComponent={mockEmptyStateComponent}
          titleText={mockTitleText}
          emoji={mockEmoji}
        />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  test.skip("does not display the title text and emoji when no messages exist", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ChatWindow
          endpoint={mockEndpoint}
          emptyStateComponent={mockEmptyStateComponent}
          titleText={mockTitleText}
          emoji={mockEmoji}
        />
      </QueryClientProvider>,
    );
    expect(screen.getByText(`${mockEmoji} ${mockTitleText}`)).toBeNull();
  });

  test.skip("displays the placeholder text in the input field", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ChatWindow
          endpoint={mockEndpoint}
          emptyStateComponent={mockEmptyStateComponent}
          placeholder={mockPlaceholder}
        />
      </QueryClientProvider>,
    );
    expect(screen.getByPlaceholderText(mockPlaceholder)).toBeInTheDocument();
  });

  test.skip("sends a message when the form is submitted", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ChatWindow
          endpoint={mockEndpoint}
          emptyStateComponent={mockEmptyStateComponent}
          placeholder={mockPlaceholder}
        />
      </QueryClientProvider>,
    );

    fireEvent.change(screen.getByPlaceholderText(mockPlaceholder), {
      target: { value: "Test message" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() =>
      expect(screen.getByTestId("chat-window")).toHaveTextContent(
        "Test message",
      ),
    );
  });
});
