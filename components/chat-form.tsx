"use client";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Message } from "ai/react";
import { Loader } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

export default function ChatForm({
  endpoint,
  onError,
  onSubmit: setMessages,
  placeholder = "Enter a message...",
  onSuccessfulIntermediateSteps,
  showIntermediateSteps,
}: {
  endpoint: string;
  onError: (e: Error) => void;
  onSubmit: (message: Message[]) => void;
  placeholder?: string;
  onSuccessfulIntermediateSteps?: (messages: Message[]) => void;
  showIntermediateSteps?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState("");
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["chat"],
    mutationFn: async ({ message }: { message: string }) =>
      fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          message,
          show_intermediate_steps: showIntermediateSteps,
        }),
      }),
    onSuccess: async (response) => {
      const { messages, intermediate_steps } = await response.json();

      // Represent intermediate steps as system messages for display purposes
      if (!intermediate_steps) {
        onSuccessfulIntermediateSteps?.(intermediate_steps);
      }

      setMessages(messages);
      setMessage("");
      inputRef.current?.focus();
    },
    onError,
  });

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync({ message });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form
      role="form"
      onSubmit={sendMessage}
      className="flex flex-col mx-auto w-[95%] md:max-w-2xl p-2"
    >
      <div className="flex w-full items-center">
        <input
          ref={inputRef}
          autoFocus
          className="grow p-4 rounded-l-xl border h-[50px] rounded-r-none focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset"
          value={message}
          placeholder={placeholder ?? "Enter a message..."}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className="bg-black text-white rounded-r-xl h-[50px] hover:bg-[rgba(0,0,0,0.9)]"
        >
          <div
            data-testid="chat-form-button-status"
            role="status"
            className={cn("flex justify-center", { hidden: !isPending })}
          >
            <Loader className="animate-spin-slow" />
            <span className="sr-only">Loading...</span>
          </div>
          <span className={cn({ hidden: isPending })}>Send</span>
        </Button>
      </div>
    </form>
  );
}
