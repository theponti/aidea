import { Chat } from "@/components/chat";

export default function AgentsPage() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded w-full max-h-[85%] overflow-hidden">
      <h1 className="text-3xl md:text-4xl mb-4">LangChain.js Agents 🦜🔗</h1>
      <ul>
        <li className="text-l">
          🤝
          <span className="ml-2">
            This template showcases a{" "}
            <a href="https://js.langchain.com/" target="_blank">
              LangChain.js
            </a>{" "}
            agent and the Vercel{" "}
            <a href="https://sdk.vercel.ai/docs" target="_blank">
              AI SDK
            </a>
            .
          </span>
        </li>
        <li>
          🛠️
          <span className="ml-2">
            The agent has memory and access to a search engine and a calculator.
          </span>
        </li>
        <li className="text-l">
          👇
          <span className="ml-2">
            Try asking e.g. <code>What is the weather in Honolulu?</code> below!
          </span>
        </li>
      </ul>
    </div>
  );
  return (
    <Chat
      endpoint="api/chat/agents"
      emptyStateComponent={InfoCard}
      placeholder="Squawk! I'm a conversational agent! Ask me about the current weather in Honolulu!"
      titleText="Polly the Agentic Parrot"
      emoji="🦜"
    ></Chat>
  );
}
