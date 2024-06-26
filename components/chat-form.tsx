"use client";

import { Loader } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { AgentStep } from "langchain/schema";
import { useState } from "react";
import { Button } from "./ui/button";

type Message = {
  id: string;
  content: string;
  role: string;
};

function useLangchainBasicChat({
  enabled,
  message,
}: {
  enabled: boolean;
  message: string;
}) {
  return useQuery({
    queryKey: ["langchain-basic", message ?? ""],
    queryFn: async ({ queryKey }) => {
      const response = await fetch("api/chat/basic-langchain", {
        method: "POST",
        body: JSON.stringify({ message: queryKey[1] }),
      });
      const json = await response.json();
      return json;
    },
    enabled,
  });
}

export default function ChatForm({
  endpoint,
  messages,
  onSubmit,
  placeholder = "Enter a message...",
  onSuccessfulIntermediateSteps,
}: {
  endpoint: string;
  messages: {
    id: string;
    content: string;
    role: string;
  }[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  onSuccessfulIntermediateSteps: (messages: Message[]) => void;
}) {
  const [input, setInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const { refetch, isFetching, isRefetching } = useLangchainBasicChat({
    enabled: false,
    message: input,
  });
  const isLoading = isFetching || isRefetching;

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    // if (showIntermediateSteps) {
    //   setIntermediateStepsLoading(true);
    //   return handleIntermediateSteps();
    // }

    e.preventDefault();
    refetch();
    setInput("");
    onSubmit(e);
  };

  // eslint-disable-next-line unused-imports/no-unused-vars
  const handleIntermediateSteps = async () => {
    setInput("");
    const messagesWithUserReply = messages.concat({
      id: messages.length.toString(),
      content: input,
      role: "user",
    });
    onSuccessfulIntermediateSteps(messagesWithUserReply);

    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        messages: messagesWithUserReply,
        show_intermediate_steps: true,
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
        onSuccessfulIntermediateSteps([...newMessages]);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 + Math.random() * 1000),
        );
      }
      onSuccessfulIntermediateSteps([
        ...newMessages,
        {
          id: (newMessages.length + intermediateStepMessages.length).toString(),
          content: json.output,
          role: "assistant",
        },
      ]);
    }
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
          {isLoading ? (
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
