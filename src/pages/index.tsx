import type { NextPage } from "next";

import PageWrap from "../components/PageWrap";

const Home: NextPage = () => {
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
