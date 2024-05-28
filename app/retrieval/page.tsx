import { Chat } from "@/components/chat";

/**
 * LangChain.js Retrieval Chain 🦜🔗
 *
 * 🔗 Perform retrievalings using LangChain chain.
 * 🪜 The chain works in two steps:
 *    1️⃣ Rephrases the input question into a "standalone" question,
 *       dereferencing pronouns based on the chat history.
 *    2️⃣ Queries for document similar to the dereferenced question
 *    3️⃣ Composes an answer.
 *
 * 🔱 This uses a vector store on Supabase.
 */
export default function AgentsPage() {
  return (
    <Chat
      endpoint="api/chat/retrieval"
      emptyStateComponent={<div />}
      showIngestForm={true}
      placeholder={
        'I\'ve got a nose for finding the right documents! Ask, "What is a document loader?"'
      }
      emoji="🐶"
      titleText="Dana the Document-Retrieving Dog"
    ></Chat>
  );
}
