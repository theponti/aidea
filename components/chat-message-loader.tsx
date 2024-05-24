import { PropsWithChildren } from "react";

export const ChatMessageWrap = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col space-y-4 max-w-[300px] border-2 border-slate-200 rounded-xl p-4 rounded-bl-none">
      {children}
    </div>
  );
};

const ChatMessageLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
};

export default ChatMessageLoader;
