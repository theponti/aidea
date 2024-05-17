import Image from "next/image";

import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import AccountDelete from "../../components/account-delete";

export const runtime = "edge";

const Account = async () => {
  const session = await getServerAuthSession();
  const pictureUrl = session?.user?.image as string;

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className="col-span-12">
        <h1>Account</h1>

        <div className="card shadow-md md:max-w-sm">
          <div className="card-body place-items-center">
            <Image
              alt="profile picture"
              src={pictureUrl.replace("_normal", "")}
              width={100}
              height={100}
              className="avatar rounded-full border-2 border-base-content w-28 h-28"
            />
            <p className="text-lg">{session?.user?.name}</p>
            <p className="text-sm text-gray-400">{session?.user?.email}</p>
          </div>
        </div>
        <div className="flex flex-col mb-12"></div>

        <div className="divider" />

        <AccountDelete />
      </div>
    </>
  );
};

export default Account;
