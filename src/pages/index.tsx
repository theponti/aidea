import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import PageWrap from "../components/PageWrap";

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
        <div className="px-6 md:px-12 xl:px-6=">
          <div className="lg:w-4/5 text-center mx-auto">
            <h1 className="text-gray-400 font-bold text-5xl md:text-6xl xl:text-7xl">
              let your brain <span className="text-primary">free.</span>
            </h1>
          </div>
        </div>
      </div>
    </PageWrap>
  );
};

export default Home;
