import type { GetServerSidePropsContext, NextPage } from "next";
import { getServerSideProtectedProps } from "src/utils";

import PageWrap from "../../components/PageWrap";

const Dashboard: NextPage = () => {
  return (
    <main>
      <PageWrap>
        <h1>Dashboard</h1>
      </PageWrap>
    </main>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { props } = await getServerSideProtectedProps(ctx);

  return { props };
}

export default Dashboard;
