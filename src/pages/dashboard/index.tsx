import type { GetServerSidePropsContext, NextPage } from "next";

import PageWrap from "src/components/PageWrap";
import { getProtectedServerSideProps } from "src/utils";
import { trpc } from "src/utils/trpc";

import IdeaForm from "./IdeaForm";
import IdeaListItem from "./IdeaListItem";

const Dashboard: NextPage = () => {
  const { data, refetch } = trpc.useQuery(["idea.getIdeas"]);

  return (
    <PageWrap>
      <div className="col-start-1 col-span-12 md:col-start-2 md:col-span-9 lg:col-start-4 lg:col-span-6 flex flex-col">
        <div>
          <IdeaForm onCreate={refetch} />
        </div>
        <div className="divider mt-8" />
        <div>
          {data?.length === 0 && "your thoughts will appear here"}
          <div>
            {data && data.length > 0 && (
              <ul className="space-y-6">
                {data.map((idea) => (
                  <IdeaListItem key={idea.id} idea={idea} onDelete={refetch} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </PageWrap>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const response = await getProtectedServerSideProps(ctx);

  return response;
}

export default Dashboard;
