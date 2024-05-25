import { Source } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { Message } from "ai/react";

export function ChatMessage(props: {
  message: Message;
  aiEmoji?: string;
  sources: Source[];
}) {
  const {
    aiEmoji,
    message: { role },
  } = props;

  const prefix = role === "user" ? "🧑" : aiEmoji;
  return (
    <div
      className={cn(
        role === "user" ? "ml-auto" : "mr-auto",
        role === "user" ? "bg-slate-100 text-black" : "bg-black text-slate-100",
        role === "user"
          ? "rounded-xl rounded-br-none"
          : "rounded-xl rounded-bl-none",
        "px-4 py-4 max-w-[80%] mb-8 flex border-2 border-slate-200",
      )}
    >
      <div className="mr-2">{prefix}</div>
      <div className="whitespace-pre-wrap flex flex-col">
        <span>{props.message.content}</span>
        {props.sources && props.sources.length ? (
          <>
            <code className="mt-4 mr-auto bg-slate-600 px-2 py-1 rounded">
              <h2>🔍 Sources:</h2>
            </code>
            <code className="mt-1 mr-2 bg-slate-600 px-2 py-1 rounded text-xs">
              {props.sources?.map((source, i) => (
                <div className="mt-2" key={"source:" + i}>
                  {i + 1}. &quot;{source.pageContent}&quot;
                  {source.metadata?.loc?.lines !== undefined ? (
                    <div>
                      <br />
                      Lines {source.metadata?.loc?.lines?.from} to{" "}
                      {source.metadata?.loc?.lines?.to}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </code>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
