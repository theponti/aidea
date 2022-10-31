import PageWrap from "../PageWrap";

export default function LoadingScene() {
  return (
    <PageWrap>
      <div className="col-span-12 min-h-full flex justify-center items-center">
        <progress className="progress progress-primary w-[50%]"></progress>
      </div>
    </PageWrap>
  );
}
