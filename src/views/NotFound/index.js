import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { Suspense } from "react";

const Scene = React.lazy(() => import("./NotFound"));

function LazyScene() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Scene />
    </Suspense>
  );
}

export default withAuthenticationRequired(LazyScene);
