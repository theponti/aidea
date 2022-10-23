import type { GetServerSidePropsContext, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import PageWrap from "../../components/PageWrap";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const Account: NextPage = () => {
  const { data: session } = useSession();
  const pictureUrl = session?.user?.image as string;
  return (
    <main>
      <PageWrap>
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[3rem]">
          Account
        </h1>

        <div className="flex flex-col mb-12">
          <Image
            className="avatar rounded-full border-4 border-cyan-200 border-solid"
            alt="profile picture"
            src={pictureUrl.replace("_normal", "")}
            width={100}
            height={100}
            layout="fixed"
          />
          <h3 className="text-lg">{session?.user?.name}</h3>
        </div>

        <button className="btn" onClick={() => signOut()}>
          Log out
        </button>
      </PageWrap>
    </main>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        // Use `false` to prevent browser caching
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Account;
