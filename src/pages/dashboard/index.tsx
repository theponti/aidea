import type { GetServerSidePropsContext, NextPage } from "next";
import { getServerSideProtectedProps } from "src/utils";

import PageWrap from "../../components/PageWrap";

const Dashboard: NextPage = () => {
  return (
    <main>
      <PageWrap>
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Dashboard
        </h1>
      </PageWrap>
    </main>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { props } = await getServerSideProtectedProps(ctx);

  return { props };
}

export default Dashboard;
