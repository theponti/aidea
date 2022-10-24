import { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";

export async function getServerSideProtectedProps(
  ctx: GetServerSidePropsContext
) {
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
