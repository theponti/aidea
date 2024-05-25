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
    <div className="flex justify-center flex-col px-4">
      <h1
        data-testid="LandingHeader"
        className="text-black font-extrabold text-[34px] md:text-[64px] leading-[1.1em] tracking-tighter mt-24 text-center"
      >
        Manage your mind <br />
        with <span className="text-purple-500">ease</span>.
      </h1>
      <p className="text-center text-gray-600 mt-4 mb-8">
        A new way to keep track of everything that matters to you.
      </p>
      <input
        type="text"
        placeholder="What's on your mind?"
        className="transition-opacity duration-1000 ease-in-out fade-in-100 border-2 border-gray-300 p-2 rounded-xl mt-4 w-3/4 max-w-sm mx-auto text-center"
      />
    </div>
  );
}
