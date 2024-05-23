"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useChat } from "ai/react";
import { ReactElement, useRef, useState } from "react";

import { ChatMessageBubble } from "@/components/ChatMessageBubble";
import { Source } from "@/lib/types";
import { Message } from "ai";
import { IntermediateStep } from "./IntermediateStep";
import ChatForm from "./chat-form";

export function ChatWindow(props: {
  endpoint: string;
  emptyStateComponent: ReactElement;
  isJSONResponse?: boolean;
  placeholder?: string;
  titleText?: string;
  emoji?: string;
  showIngestForm?: boolean;
}) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const { emoji, endpoint, isJSONResponse, placeholder, titleText } = props;

  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, Source[]>
  >({});

  const { messages, append } = useChat({
    api: endpoint,
    async onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader
        ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
        : [];
      const messageIndexHeader = response.headers.get("x-message-index");

      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
    streamMode: isJSONResponse ? "text" : "stream-data",
    onError: (e) => {
      toast(e.message, {
        theme: "dark",
      });
    },
  });

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto items-center p-4 md:p-8 rounded grow overflow-hidden">
      <h2 className={`${messages.length > 0 ? "" : "hidden"} text-2xl`}>
        {emoji} {titleText}
      </h2>
      <div
        data-testid="chat-window"
        className="relative flex flex-col-reverse w-full mb-4 overflow-auto transition-[flex-grow] ease-in-out"
        ref={messageContainerRef}
      >
        {messages.length > 0
          ? [...messages].reverse().map((m, i) => {
              const sourceKey = (messages.length - 1 - i).toString();
              return m.role === "system" ? (
                <IntermediateStep key={m.id} message={m}></IntermediateStep>
              ) : (
                <ChatMessageBubble
                  key={m.id}
                  message={m}
                  aiEmoji={emoji}
                  sources={sourcesForMessages[sourceKey]}
                ></ChatMessageBubble>
              );
            })
          : ""}
      </div>
      <ChatForm
        endpoint={endpoint}
        onSubmit={(message: Message) => append(message)}
        messages={messages}
        placeholder={placeholder}
      />
      <ToastContainer />
    </div>
  );
}
