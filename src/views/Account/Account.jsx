import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import cx from "classnames";
import React from "react";

const styles = {
  wrap: cx("flex", "md:flex-col", "md:items-start", "md:items-center"),
  nickname: cx("text-2xl", "text-center", "font-semibold", "mt-6"),
  email: cx("text-md", "font-normal", "mt-4"),
};
const Account = () => {
  const { user } = useAuth0();
  const { nickname, email, picture } = user;

  return (
    <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className={styles.wrap}>
        <img
          src={picture}
          style={{
            height: "50px",
            width: "50px",
          }}
        />
        <div>
          <h2 className={styles.nickname}>{nickname}</h2>
          <h3 className={styles.email}>{email}</h3>
        </div>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Account);
