import { ChatWindow } from "@/components/chat";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    return (
      <div className="flex justify-center flex-col flex-1">
        <ChatWindow
          endpoint="api/chat/basic-langchain"
          emptyStateComponent={<div />}
        ></ChatWindow>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col">
      <h1
        data-testid="LandingHeader"
        className="text-gray-500 font-bold text-5xl md:text-6xl xl:text-7xl mt-24 text-center"
      >
        let your brain <span className="text-purple-500">free.</span>
      </h1>
      <input
        type="text"
        placeholder="Enter your name"
        className="transition-opacity duration-1000 ease-in-out fade-in-100 opacity-0 border-2 border-gray-300 p-2 rounded-md mt-4 w-64"
      />
    </div>
  );
}
