import { Chat } from "@/components/chat";

/**
 * # LangChain.js Structured Output 🦜🔗
 * - 🧱 This template showcases how to output structured responses with a [LangChain.js](https://js.langchain.com/) chain and the Vercel [AI SDK](https://sdk.vercel.ai/docs).
 * - ☎️ The chain formats the input schema and passes it into an OpenAI Functions model, then parses the output.
 * - 💻 You can find the prompt, model, and schema logic for this use-case in `app/api/chat/structured_output/route.ts`.
 * - 📊 By default, the chain returns an object with `tone`, `word_count`, `entity`, `chat_response`, and an optional `final_punctuation`, but you can change it to whatever you'd like!
 * - 👇 Try typing e.g. `What a beautiful day!` below!
 */
export default function StructuredOutputPage() {
  return (
    <Chat
      endpoint="api/chat/structured_output"
      emptyStateComponent={<div />}
      placeholder={`No matter what you type here, I'll always return the same JSON object with the same structure!`}
      emoji="🧱"
      titleText="Structured Output"
    ></Chat>
  );
}
