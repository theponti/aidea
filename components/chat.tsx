"use client";

import "react-toastify/dist/ReactToastify.css";

import { Message } from "ai/react";
import { ReactElement, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { ChatMessage } from "@/components/chat-message";
import { Source } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { IntermediateStep } from "./IntermediateStep";
import ChatForm from "./chat-form";

const useActiveChat = () => {
  return useQuery({
    queryKey: ["active-chat"],
    queryFn: () => {
      return fetch("/api/chat", {
        method: "GET",
      }).then((res) => res.json());
    },
  });
};

export function ChatWindow(props: {
  endpoint: string;
  emptyStateComponent: ReactElement;
  placeholder?: string;
  titleText?: string;
  emoji?: string;
  showIngestForm?: boolean;
}) {
  const { data, status } = useActiveChat();
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const { emoji, endpoint, placeholder, titleText } = props;
  const [messages, setMessages] = useState<Message[]>(data?.messages || []);
  const [sourcesForMessages, setSourcesForMessages] = useState<
    Record<string, Source[]>
  >({});

  useEffect(() => {
    if (status === "success") {
      setMessages(data?.messages || []);
    }
  }, [status]);

  const onFormSubmit = (newMessages: Message[], response?: Response) => {
    setMessages(newMessages);

    if (response === undefined) {
      return;
    }

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
  };

  const onFormError = (e: Error) => {
    console.error(e); // eslint-disable-line no-console
    toast(e.message, { theme: "dark" });
  };

  return (
    <div className="flex flex-col grow w-full max-w-3xl mx-auto items-center p-4">
      <h2 className={`${messages.length > 0 ? "" : "hidden"} text-2xl`}>
        {emoji} {titleText}
      </h2>
      <div
        data-testid="chat"
        className="relative flex-1 flex flex-col-reverse w-full overflow-hidden transition-[flex-grow] ease-in-out"
        ref={messageContainerRef}
      >
        {status === "pending" && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <LoaderCircle className="animate-spin-slow" size={64} />
          </div>
        )}
        {status === "success" && messages.length > 0
          ? [...messages].reverse().map((m, i) => {
              const sourceKey = (messages.length - 1 - i).toString();
              return m.role === "system" ? (
                <IntermediateStep key={m.id} message={m}></IntermediateStep>
              ) : (
                <ChatMessage
                  key={m.id}
                  message={m}
                  aiEmoji={emoji}
                  sources={sourcesForMessages[sourceKey]}
                ></ChatMessage>
              );
            })
          : ""}
      </div>
      <ChatForm
        endpoint={endpoint}
        onSubmit={onFormSubmit}
        onError={onFormError}
        placeholder={placeholder}
      />
      <ToastContainer />
    </div>
  );
}
