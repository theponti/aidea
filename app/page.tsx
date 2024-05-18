import { ChatWindow } from "@/components/ChatWindow";

export default function Home() {
  return (
    <ChatWindow endpoint="api/chat" emptyStateComponent={<div />}></ChatWindow>
  );
}
