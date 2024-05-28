import { Chat } from "@/components/chat";
import { UploadDocumentsForm } from "@/components/UploadDocumentsForm";

/**
  # 🦜 Retrieval Agent

  - 🤝 Showcases a LangChain retrieval chain.
  - 🛠️ The agent has access to a vector store retriever as a tool as well as a memory. It's particularly well suited to meta-questions about the current conversation.
  - 🤖 By default, the agent is pretending to be a robot, but you can change the prompt to whatever you want!
  - 🔱 Before running this example, you'll first need to set up a Supabase (or other) vector store. See the README for more details.
  - 👇 Upload some text, then try asking e.g. `What are some ways of doing retrieval in LangChain?` below!
 */
export default function AgentsPage() {
  return (
    <>
      <UploadDocumentsForm />
      <Chat
        endpoint="api/chat/retrieval_agents"
        emptyStateComponent={<div />}
        showIngestForm={true}
        placeholder={
          'Beep boop! I\'m a robot retrieval-focused agent! Ask, "What are some ways of doing retrieval in LangChain.js?"'
        }
        emoji="🤖"
        titleText="Robbie the Retrieval Robot"
      ></Chat>
    </>
  );
}
