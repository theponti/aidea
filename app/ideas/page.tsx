import type { NextPage } from "next";
import { redirect } from "next/navigation";

import { api } from "@/lib/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import DashboardNav from "components/DashboardNav";
import IdeaForm from "components/IdeaForm";
import IdeaListItem from "components/IdeaListItem";

const Dashboard: NextPage = async () => {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  const data = await api.idea.getIdeas();

  return (
    <div className="flex flex-col">
      <DashboardNav />
      <IdeaForm />
      <div>
        {data?.length === 0 && "your thoughts will appear here"}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map((idea) => (
              <IdeaListItem key={idea.id} idea={idea} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
