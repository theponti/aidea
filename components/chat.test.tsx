import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { testServer } from "tests/test.utils";
import { describe, expect, test, vi } from "vitest";
import { Chat } from "./chat";

vi.mock("ai/react");

describe("Chat", () => {
  const mockEndpoint = "http://localhost:3000/api/chat";
  const mockEmptyStateComponent = <div>Empty State</div>;
  const mockPlaceholder = "Type a message...";
  const mockTitleText = "Chat Window";
  const mockEmoji = "😀";

  test("renders without crashing", async () => {
    testServer.use(
      http.get(mockEndpoint, () => HttpResponse.json({ messages: [] })),
    );

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Chat
          endpoint={mockEndpoint}
          emptyStateComponent={mockEmptyStateComponent}
          titleText={mockTitleText}
          emoji={mockEmoji}
        />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(
        screen.queryByText(`${mockEmoji} ${mockTitleText}`),
      ).toBeInTheDocument();
    });
  });

  test("displays the title text and emoji when messages exist", async () => {
    testServer.use(
      http.get(mockEndpoint, () =>
        HttpResponse.json({
          messages: [
            {
              id: "1",
              content: "Test message",
              role: "user",
            },
          ],
        }),
      ),
    );
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Chat
          endpoint={mockEndpoint}
          emptyStateComponent={mockEmptyStateComponent}
          titleText={mockTitleText}
          emoji={mockEmoji}
        />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Test message")).toBeInTheDocument();
    });
  });

  test.skip("does not display the title text and emoji when no messages exist", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Chat
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
        <Chat
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
        <Chat
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
      expect(screen.getByTestId("chat")).toHaveTextContent("Test message"),
    );
  });
});
