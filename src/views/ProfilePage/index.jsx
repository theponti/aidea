import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import cx from "classnames";
import React from "react";

const ProfilePage = () => {
  const { user } = useAuth0();
  const { displayName, email, photoUrl } = user;

  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div
        className={cx(
          "border-blue-400",
          "border",
          "flex-col",
          "flex",
          "items-center",
          "md:flex-row",
          "md:items-start",
          "px-3",
          "py-4"
        )}
      >
        <div
          style={{
            background: `url(${photoUrl})  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
          }}
          className="border border-blue-300"
        ></div>
        <div className="md:pl-4">
          <h2 className="text-2xl font-semibold">{displayName}</h2>
          <h3 className="italic">{email}</h3>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(ProfilePage);
