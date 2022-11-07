import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import LoadingScene from "src/components/Loading";
import PageWrap from "src/components/PageWrap";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [router, status]);

  return (
    <PageWrap>
      <div className="col-span-12 flex justify-center flex-col">
        <h1 className="text-gray-400 font-bold text-5xl md:text-6xl xl:text-7xl mt-24 text-center">
          let your brain <span className="text-primary">free.</span>
        </h1>
        {status === "loading" && <LoadingScene />}
      </div>
    </PageWrap>
  );
};

export default Home;
