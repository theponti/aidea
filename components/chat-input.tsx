"use client";

import { Loader } from "lucide-react";

import { AgentStep } from "langchain/schema";
import { useState } from "react";
import { Button } from "./ui/button";

type Message = {
  id: string;
  content: string;
  role: string;
};

export default function ChatForm({
  endpoint,
  hasIntermediateSteps,
  messages,
  onSubmit,
  placeholder = "Enter a message...",
  onSuccessfulIntermediateSteps,
}: {
  endpoint: string;
  hasIntermediateSteps?: boolean;
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
  const [chatEndpointIsLoading, setChatEndpointIsLoading] = useState(false);
  const [showIntermediateSteps, setShowIntermediateSteps] = useState(false);
  const [intermediateStepsLoading, setIntermediateStepsLoading] =
    useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    if (showIntermediateSteps) {
      setIntermediateStepsLoading(true);
      return handleIntermediateSteps();
    }

    e.preventDefault();
    setChatEndpointIsLoading(true);
    // await fetch("api/chat/basic-langchain", {
    //   method: "POST",
    //   body: JSON.stringify({ message: input }),
    // });
    setChatEndpointIsLoading(false);
    setInput("");
    onSubmit(e);
  };

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

    setIntermediateStepsLoading(false);

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

  const intemediateStepsToggle = hasIntermediateSteps && (
    <div>
      <input
        type="checkbox"
        id="show_intermediate_steps"
        name="show_intermediate_steps"
        checked={showIntermediateSteps}
        onChange={(e) => setShowIntermediateSteps(e.target.checked)}
      ></input>
      <label htmlFor="show_intermediate_steps"> Show intermediate steps</label>
    </div>
  );

  return (
    <form
      onSubmit={sendMessage}
      className="absolute bottom-4 flex flex-col mx-auto w-[95%] md:max-w-2xl p-2"
    >
      <div className="flex">{intemediateStepsToggle}</div>
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
          {chatEndpointIsLoading || intermediateStepsLoading ? (
            <div role="status" className="flex justify-center">
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
