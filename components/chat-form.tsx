"use client";

import { useMutation } from "@tanstack/react-query";
import { Message } from "ai/react";
import { AgentStep } from "langchain/schema";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function ChatForm({
  endpoint,
  messages,
  onSubmit,
  placeholder = "Enter a message...",
  onSuccessfulIntermediateSteps,
  showIntermediateSteps,
}: {
  endpoint: string;
  messages: Message[];
  onSubmit: (message: Message) => Promise<string | null | undefined>;
  placeholder?: string;
  onSuccessfulIntermediateSteps?: (messages: Message[]) => void;
  showIntermediateSteps?: boolean;
}) {
  const [input, setInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["chat"],
    mutationFn: async () => {
      const messagesWithUserReply = messages.concat({
        id: messages.length.toString(),
        content: input,
        role: "user",
      });

      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          messages: messagesWithUserReply,
          show_intermediate_steps: showIntermediateSteps,
        }),
      });

      const json = await response.json();

      if (response.status === 200) {
        // Represent intermediate steps as system messages for display purposes
        const intermediateStepMessages = (json.intermediate_steps ?? []).map(
          (intermediateStep: AgentStep, i: number) => {
            return {
              id: (messagesWithUserReply.length + i).toString(),
              content: JSON.stringify(intermediateStep),
              role: "system",
            };
          },
        );
        const newMessages = messagesWithUserReply;

        for (const message of intermediateStepMessages) {
          newMessages.push(message);
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 + Math.random() * 1000),
          );
        }

        onSuccessfulIntermediateSteps?.([
          ...newMessages,
          {
            id: (
              newMessages.length + intermediateStepMessages.length
            ).toString(),
            content: json.output,
            role: "assistant",
          },
        ]);
      }
    },
  });

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync();
    onSubmit({
      id: messages.length.toString(),
      content: input,
      role: "user",
    });
  };

  return (
    <form
      role="form"
      onSubmit={sendMessage}
      className="absolute bottom-4 flex flex-col mx-auto w-[95%] md:max-w-2xl p-2"
    >
      <div className="flex w-full items-center">
        <input
          className="grow p-4 rounded-l-xl border h-[50px]"
          value={input}
          placeholder={placeholder ?? "Enter a message..."}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className="bg-black text-white rounded-r-xl h-[50px] hover:bg-[rgba(0,0,0,0.9)]"
        >
          {isPending ? (
            <div
              data-testid="chat-form-button-status"
              role="status"
              className="flex justify-center"
            >
              <Loader className="animate-spin-slow" />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <span>Send</span>
          )}
        </Button>
      </div>
    </form>
  );
}
