import type { GetServerSidePropsContext, NextPage } from "next";
import { getProtectedServerSideProps } from "src/utils";

import PageWrap from "../../components/PageWrap";

const Dashboard: NextPage = () => {
  return (
    <PageWrap>
      <div className="col-start-4 col-span-6">
        <h1>Dashboard</h1>
      </div>
    </PageWrap>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const response = await getProtectedServerSideProps(ctx);

  return response;
}

export default Dashboard;
